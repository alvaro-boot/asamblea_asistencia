import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { createClient } from '@supabase/supabase-js';
import { Repository } from 'typeorm';
import { Delegado } from './delegado.entity';
import { RegisterFirmaDto } from './dto/register-firma.dto';
import { SearchDelegadosDto } from './dto/search-delegados.dto';

@Injectable()
export class DelegadosService {
  constructor(
    @InjectRepository(Delegado)
    private readonly delegadosRepo: Repository<Delegado>,
  ) {}

  async search(dto: SearchDelegadosDto): Promise<Delegado[]> {
    const qb = this.delegadosRepo.createQueryBuilder('d');
    qb.andWhere('d.firmado = :firmado', { firmado: false });

    if (dto.numeroDocumento) {
      qb.andWhere('d.numero_documento ILIKE :numeroDocumento', {
        numeroDocumento: `%${dto.numeroDocumento}%`,
      });
    }

    if (dto.nombreCompleto) {
      qb.andWhere('d.nombre_completo ILIKE :nombreCompleto', {
        nombreCompleto: `%${dto.nombreCompleto}%`,
      });
    }

    return qb.getMany();
  }

  async getFirmados(): Promise<Delegado[]> {
    return this.delegadosRepo.find({
      where: { firmado: true },
      order: { firma_actualizada_at: 'ASC', nombre_completo: 'ASC' },
    });
  }

  async getResumenAsistencia(): Promise<{ total: number; firmados: number; faltan: number }> {
    const [total, firmados] = await Promise.all([
      this.delegadosRepo.count(),
      this.delegadosRepo.count({ where: { firmado: true } }),
    ]);
    return { total, firmados, faltan: Math.max(0, total - firmados) };
  }

  async buildActaPdf(): Promise<Buffer> {
    const firmados = await this.getFirmados();

    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);

    let page = doc.addPage([595, 842]); // A4
    let y = 800;
    const marginX = 40;
    const rowHeight = 82;

    const drawHeader = () => {
      page.drawText('ACTA DE ASISTENCIA', { x: marginX, y, size: 16, font: bold });
      y -= 22;
      page.drawText(`Generado: ${new Date().toLocaleString('es-CO')}`, {
        x: marginX,
        y,
        size: 10,
        font,
      });
      y -= 20;
      page.drawText(`Total firmados: ${firmados.length}`, { x: marginX, y, size: 10, font });
      y -= 24;
    };

    drawHeader();

    for (const d of firmados) {
      if (y < 120) {
        page = doc.addPage([595, 842]);
        y = 800;
        drawHeader();
      }

      page.drawRectangle({
        x: marginX - 4,
        y: y - rowHeight + 10,
        width: 520,
        height: rowHeight,
        borderWidth: 0.8,
        borderColor: rgb(0.8, 0.84, 0.92),
      });

      page.drawText(`Nombre: ${d.nombre_completo}`, { x: marginX + 6, y: y - 16, size: 11, font: bold });
      page.drawText(`CC: ${d.numero_documento}`, { x: marginX + 6, y: y - 34, size: 10, font });
      page.drawText(
        `Fecha firma: ${d.firma_actualizada_at ? d.firma_actualizada_at.toLocaleString('es-CO') : 'N/A'}`,
        { x: marginX + 6, y: y - 50, size: 9, font },
      );

      if (d.firma_base64) {
        const bytes = Buffer.from(d.firma_base64, 'base64');
        try {
          const img = await doc.embedPng(bytes);
          const scaled = img.scale(0.26);
          page.drawImage(img, { x: 370, y: y - 60, width: scaled.width, height: scaled.height });
        } catch {
          try {
            const img = await doc.embedJpg(bytes);
            const scaled = img.scale(0.26);
            page.drawImage(img, { x: 370, y: y - 60, width: scaled.width, height: scaled.height });
          } catch {
            page.drawText('Firma no disponible', { x: 380, y: y - 36, size: 9, font });
          }
        }
      } else {
        page.drawText('Firma no disponible', { x: 380, y: y - 36, size: 9, font });
      }

      y -= rowHeight + 10;
    }

    const bytes = await doc.save();
    return Buffer.from(bytes);
  }

  async registerFirma(id: string, dto: RegisterFirmaDto): Promise<Delegado> {
    const delegado = await this.delegadosRepo.findOne({ where: { id } });
    if (!delegado) {
      throw new NotFoundException('Delegado no encontrado');
    }

    const normalized = this.normalizeAndValidateBase64(dto.firmaBase64);
    const upload = await this.uploadFirmaToSupabase(normalized.base64, normalized.mimeType, delegado.id);

    delegado.firma_base64 = normalized.base64;
    delegado.firma_supabase_path = upload.path;
    delegado.firma_supabase_url = upload.publicUrl;
    delegado.firma_actualizada_at = new Date();
    delegado.firmado = true;

    return this.delegadosRepo.save(delegado);
  }

  private normalizeAndValidateBase64(input: string): { base64: string; mimeType: string } {
    const trimmed = input.trim();
    const idx = trimmed.indexOf('base64,');
    const value = idx >= 0 ? trimmed.slice(idx + 'base64,'.length) : trimmed;

    const base64 = value.replace(/\s/g, '');
    if (!base64) {
      throw new BadRequestException('firmaBase64 está vacía');
    }

    // Validación superficial: evita guardar basura. (No intenta decodificación completa.)
    const isBase64 = /^[A-Za-z0-9+/]+={0,2}$/.test(base64);
    if (!isBase64) {
      throw new BadRequestException('firmaBase64 no parece ser base64 válido');
    }

    const mimeMatch = trimmed.match(/^data:([^;]+);base64,/i);
    const mimeType = mimeMatch?.[1]?.toLowerCase() ?? 'image/png';

    return { base64, mimeType };
  }

  private async uploadFirmaToSupabase(
    base64: string,
    mimeType: string,
    delegadoId: string,
  ): Promise<{ path: string; publicUrl: string | null }> {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ??
      process.env.SUPABASE_ANON_KEY ??
      process.env.SUPABASE_PUBLISHABLE_KEY;
    const bucket = process.env.SUPABASE_BUCKET ?? 'firmas';

    if (!supabaseUrl || !supabaseKey) {
      throw new BadRequestException(
        'Faltan SUPABASE_URL y una clave de Supabase (SERVICE_ROLE, ANON o PUBLISHABLE)',
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const extension = this.mimeToExtension(mimeType);
    const path = `delegados/${delegadoId}/${Date.now()}.${extension}`;
    const fileBuffer = Buffer.from(base64, 'base64');

    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, fileBuffer, { contentType: mimeType, upsert: true });

    if (error) {
      throw new BadRequestException(`No se pudo guardar firma en Supabase: ${error.message}`);
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return { path, publicUrl: data?.publicUrl ?? null };
  }

  private mimeToExtension(mimeType: string): string {
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'jpg';
    if (mimeType.includes('svg')) return 'svg';
    if (mimeType.includes('webp')) return 'webp';
    return 'png';
  }
}

