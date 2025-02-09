import { MealType } from '@/interfaces';
import { IsEnum } from 'class-validator';

export class CreateMenuPlatoDto {
  @IsEnum(MealType)
  categoria: MealType;
}
