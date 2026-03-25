import { IsOptional, IsString, MinLength } from 'class-validator';

export class SearchDelegadosDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  numeroDocumento?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  nombreCompleto?: string;
}

