import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientPlateDto } from './create-ingredient-plate.dto';

export class UpdateIngredientPlateDto extends PartialType(
  CreateIngredientPlateDto,
) {}
