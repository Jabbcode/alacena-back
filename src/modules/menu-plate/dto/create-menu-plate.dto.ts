import { MealType } from '@/interfaces';
import { IsEnum } from 'class-validator';

export class CreateMenuPlateDto {
  @IsEnum(MealType)
  category: MealType;
}
