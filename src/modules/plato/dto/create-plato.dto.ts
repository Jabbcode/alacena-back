import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePlatoDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  @IsString({ message: 'El nombre debe ser un string' })
  @MinLength(5, { message: 'El nombre debe tener minimo 5 caracteres' })
  nombre: string;
}
