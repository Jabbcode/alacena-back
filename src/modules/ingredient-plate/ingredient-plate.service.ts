import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateIngredientPlateDto } from './dto/create-ingredient-plate.dto';

import { IngredientPlate } from './entities/ingredient-plate.entity';
import { Plate } from '../plate/entities/plate.entity';
import { IngredientPlateHelper } from './helpers/ingredient-plate.helper';

@Injectable()
export class IngredientPlateService {
  constructor(
    @InjectRepository(IngredientPlate)
    private ingredientPlateRepository: Repository<IngredientPlate>,
    @InjectRepository(Plate)
    private plateRepository: Repository<Plate>,
    private ingredientPlateHelper: IngredientPlateHelper,
  ) {}

  async assignIngredientToPlate(
    createIngredientPlateDto: CreateIngredientPlateDto,
    plateId: number,
    ingredientId: number,
  ): Promise<Plate> {
    const plateFound = await this.ingredientPlateHelper.getPlate(plateId);

    const plateIngredient =
      await this.ingredientPlateHelper.getIngredient(ingredientId);

    const isPresentIngredienteToPlato = plateFound.ingredients.find(
      (ip) => ip.info.id === ingredientId,
    );

    if (isPresentIngredienteToPlato) {
      throw new Error('El plato ya tiene ese ingrediente asociado');
    }

    const newIngredientePlate: CreateIngredientPlateDto =
      this.ingredientPlateRepository.create({
        quantity: createIngredientPlateDto.quantity,
        unit: createIngredientPlateDto.unit,
        plate: plateFound,
        info: plateIngredient,
      });

    await this.ingredientPlateRepository.save(newIngredientePlate);

    return this.plateRepository.findOne({
      where: { id: plateId },
      relations: ['ingredients', 'ingredients.info'],
    });
  }

  async removeIngredientFromPlate(
    plateId: number,
    ingredientId: number,
  ): Promise<Plate> {
    await this.ingredientPlateHelper.getPlate(plateId);
    await this.ingredientPlateHelper.getIngredient(ingredientId);

    await this.ingredientPlateRepository.delete({
      plate: { id: plateId },
      info: { id: ingredientId },
    });

    return this.plateRepository.findOne({
      where: { id: plateId },
      relations: ['ingredients', 'ingredients.info'],
    });
  }
}
