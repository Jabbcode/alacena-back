import { IsDefined } from 'class-validator';

export class CreateMenuDto {
  @IsDefined({ message: 'La fecha es obligatoria' })
  fecha: Date;
}
