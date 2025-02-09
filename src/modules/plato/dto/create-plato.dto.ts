import { IsString } from 'class-validator';

export class CreatePlatoDto {
  @IsString()
  nombre: string;
}
