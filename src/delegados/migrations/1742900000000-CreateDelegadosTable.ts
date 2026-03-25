import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDelegadosTable1742900000000 implements MigrationInterface {
  name = 'CreateDelegadosTable1742900000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "delegados" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "numero_documento" varchar(64) NOT NULL,
        "nombre_completo" varchar(255) NOT NULL,
        "firma_base64" text,
        "firma_actualizada_at" timestamptz,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT "PK_delegados_id" PRIMARY KEY ("id")
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_delegados_numero_documento"
      ON "delegados" ("numero_documento");
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_delegados_nombre_completo"
      ON "delegados" ("nombre_completo");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_delegados_nombre_completo";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_delegados_numero_documento";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "delegados";`);
  }
}

