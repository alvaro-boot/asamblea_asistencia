import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'delegados' })
export class Delegado {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ name: 'numero_documento', type: 'varchar', length: 64 })
  numero_documento!: string;

  @Index()
  @Column({ name: 'nombre_completo', type: 'varchar', length: 255 })
  nombre_completo!: string;

  @Column({ name: 'firma_base64', type: 'text', nullable: true })
  firma_base64?: string | null;

  @Column({ name: 'firma_supabase_path', type: 'text', nullable: true })
  firma_supabase_path?: string | null;

  @Column({ name: 'firma_supabase_url', type: 'text', nullable: true })
  firma_supabase_url?: string | null;

  @Column({ name: 'firma_actualizada_at', type: 'timestamptz', nullable: true })
  firma_actualizada_at?: Date | null;

  @Column({ name: 'firmado', type: 'boolean', default: false })
  firmado!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at!: Date;
}

