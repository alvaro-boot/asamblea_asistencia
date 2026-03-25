import { MigrationInterface, QueryRunner } from 'typeorm';

type DelegadoSeed = {
  numeroDocumento: string;
  nombreCompleto: string;
};

export class SeedDelegados1742902000000 implements MigrationInterface {
  name = 'SeedDelegados1742902000000';

  /**
   * Pega aqui la lista de delegados a cargar.
   * Ejemplo:
   * { numeroDocumento: '123456789', nombreCompleto: 'NOMBRE APELLIDO' }
   */
  private readonly delegados: DelegadoSeed[] = [];

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!this.delegados.length) {
      return;
    }

    for (const d of this.delegados) {
      await queryRunner.query(
        `
        INSERT INTO "delegados" ("id", "numero_documento", "nombre_completo", "created_at")
        VALUES (gen_random_uuid(), $1, $2, now())
        ON CONFLICT DO NOTHING;
        `,
        [d.numeroDocumento.trim(), d.nombreCompleto.trim()],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (!this.delegados.length) {
      return;
    }

    for (const d of this.delegados) {
      await queryRunner.query(
        `
        DELETE FROM "delegados"
        WHERE "numero_documento" = $1 AND "nombre_completo" = $2;
        `,
        [d.numeroDocumento.trim(), d.nombreCompleto.trim()],
      );
    }
  }
}

