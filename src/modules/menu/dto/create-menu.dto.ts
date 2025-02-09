import { IsDate } from 'class-validator';

export class CreateMenuDto {
  @IsDate()
  fecha: string;
}
