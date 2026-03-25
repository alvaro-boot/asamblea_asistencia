import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFirmadoColumn1742910000000 implements MigrationInterface {
  name = 'AddFirmadoColumn1742910000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "delegados"
      ADD COLUMN IF NOT EXISTS "firmado" boolean NOT NULL DEFAULT false;
    `);

    await queryRunner.query(`
      UPDATE "delegados"
      SET "firmado" = true
      WHERE "firma_actualizada_at" IS NOT NULL
         OR NULLIF(TRIM(COALESCE("firma_supabase_url", '')), '') IS NOT NULL
         OR NULLIF(TRIM(COALESCE("firma_base64", '')), '') IS NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "delegados"
      DROP COLUMN IF EXISTS "firmado";
    `);
  }
}
