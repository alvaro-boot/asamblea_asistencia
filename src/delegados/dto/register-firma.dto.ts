import { IsString, MinLength } from 'class-validator';

export class RegisterFirmaDto {
  // Acepta tanto la forma pura (solo base64) como la forma `data:image/...;base64,...`,
  // que el servicio normaliza.
  @IsString()
  @MinLength(1)
  firmaBase64!: string;
}

