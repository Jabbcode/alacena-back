import { IsDefined, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePlateDto {
  @IsDefined({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un string' })
  @MinLength(5, { message: 'El nombre debe tener minimo 5 caracteres' })
  name: string;

  @IsOptional()
  description?: string;
}
