import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export function typeormConfig(config: ConfigService): TypeOrmModuleOptions {
  const databaseUrl = config.get<string>('DATABASE_URL') ?? buildDatabaseUrlFromParts(config);
  if (!databaseUrl) {
    throw new Error(
      'Falta DATABASE_URL o variables PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE',
    );
  }

  const isProd = config.get<string>('NODE_ENV') === 'production';

  return {
    type: 'postgres',
    url: databaseUrl,
    ssl: isProd ? { rejectUnauthorized: false } : undefined,
    autoLoadEntities: true,
    synchronize: false,
    migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
    migrationsRun: true,
  };
}

function buildDatabaseUrlFromParts(config: ConfigService): string | null {
  const host = config.get<string>('PGHOST');
  const port = config.get<string>('PGPORT');
  const user = config.get<string>('PGUSER');
  const password = config.get<string>('PGPASSWORD');
  const database = config.get<string>('PGDATABASE') ?? config.get<string>('POSTGRES_DB');

  if (!host || !port || !user || !password || !database) {
    return null;
  }

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

