import { BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { DelegadosService } from './delegados.service';
import { SearchDelegadosDto } from './dto/search-delegados.dto';
import { RegisterFirmaDto } from './dto/register-firma.dto';

@Controller('delegados')
export class DelegadosController {
  constructor(private readonly delegadosService: DelegadosService) {}

  @Get('resumen')
  async resumenAsistencia() {
    return this.delegadosService.getResumenAsistencia();
  }

  @Get('acta/pdf')
  async exportActaPdf(@Res() res: Response) {
    const pdf = await this.delegadosService.buildActaPdf();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="acta-asistencia.pdf"');
    res.setHeader('Content-Length', String(pdf.length));
    res.send(pdf);
  }

  @Get()
  async search(@Query() query: SearchDelegadosDto) {
    if (!query.numeroDocumento && !query.nombreCompleto) {
      throw new BadRequestException('Debes enviar numeroDocumento o nombreCompleto');
    }

    const delegados = await this.delegadosService.search(query);
    return delegados.map((d) => ({
      id: d.id,
      numeroDocumento: d.numero_documento,
      nombreCompleto: d.nombre_completo,
      firmaSupabaseUrl: d.firma_supabase_url ?? undefined,
      firmaActualizadaAt: d.firma_actualizada_at ?? undefined,
    }));
  }

  @Post(':id/firma')
  async registerFirma(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: RegisterFirmaDto,
  ) {
    const actualizado = await this.delegadosService.registerFirma(id, body);
    return {
      id: actualizado.id,
      numeroDocumento: actualizado.numero_documento,
      nombreCompleto: actualizado.nombre_completo,
      firmaSupabasePath: actualizado.firma_supabase_path ?? undefined,
      firmaSupabaseUrl: actualizado.firma_supabase_url ?? undefined,
      firmaActualizadaAt: actualizado.firma_actualizada_at ?? undefined,
    };
  }
}

