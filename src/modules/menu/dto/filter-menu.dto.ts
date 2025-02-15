import { IsOptional } from 'class-validator';

export class FilterMenuDto {
  @IsOptional()
  fecha: Date;
}
