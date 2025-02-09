import { IsDate, IsEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsDate({ message: 'Debe tener un formato valido' })
  @IsEmpty({ message: 'La fecha no puede estar vacia' })
  fecha: Date;
}
