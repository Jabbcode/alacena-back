import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty({ message: 'La fecha no puede estar vacia' })
  fecha: Date;
}
