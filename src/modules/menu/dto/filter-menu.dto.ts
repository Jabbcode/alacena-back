import { IsOptional } from 'class-validator';

export class FilterMenuDto {
  @IsOptional()
  date?: Date;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;
}
