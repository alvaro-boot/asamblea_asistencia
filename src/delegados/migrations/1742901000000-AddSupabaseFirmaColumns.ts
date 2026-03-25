import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSupabaseFirmaColumns1742901000000 implements MigrationInterface {
  name = 'AddSupabaseFirmaColumns1742901000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "delegados"
      ADD COLUMN IF NOT EXISTS "firma_supabase_path" text;
    `);

    await queryRunner.query(`
      ALTER TABLE "delegados"
      ADD COLUMN IF NOT EXISTS "firma_supabase_url" text;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "delegados"
      DROP COLUMN IF EXISTS "firma_supabase_url";
    `);

    await queryRunner.query(`
      ALTER TABLE "delegados"
      DROP COLUMN IF EXISTS "firma_supabase_path";
    `);
  }
}

