import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plate } from '@/modules/plate/entities/plate.entity';
import { Ingredient } from '@/modules/ingredient/entities/ingredient.entity';

export class IngredientPlateHelper {
  constructor(
    @InjectRepository(Plate) private plateRepository: Repository<Plate>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  getPlate = async (plateId: number) => {
    const plate = await this.plateRepository.findOne({
      where: { id: plateId },
      relations: ['ingredients', 'ingredients.info'],
    });

    if (!plate) {
      throw new Error('Plato no encontrado');
    } else {
      return plate;
    }
  };

  getIngredient = async (ingredientId: number) => {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id: ingredientId },
    });

    if (!ingredient) {
      throw new Error('Ingrediente no encontrado');
    } else {
      return ingredient;
    }
  };
}
