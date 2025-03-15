import { UnitType } from '@/interfaces';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateIngredientPlateDto {
  @IsNumber()
  quantity: number;

  @IsEnum(UnitType)
  unit: UnitType;
}
