import { IsDateString, IsDefined } from 'class-validator';

export class CreateMenuDto {
  @IsDefined({ message: 'Debe ingresar una fecha' })
  @IsDateString(
    {},
    {
      message: 'La fecha debe ser una cadena de fecha válida (YYYY-MM-DD)',
    },
  )
  date: Date;
}
