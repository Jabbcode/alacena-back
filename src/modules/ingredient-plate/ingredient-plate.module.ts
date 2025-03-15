import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientPlate } from './entities/ingredient-plate.entity';
import { Plate } from '../plate/entities/plate.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

import { IngredientPlateService } from './ingredient-plate.service';

import { IngredientPlateController } from './ingredient-plate.controller';

import { IngredientPlateHelper } from './helpers/ingredient-plate.helper';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientPlate, Plate, Ingredient])],
  controllers: [IngredientPlateController],
  providers: [IngredientPlateService, IngredientPlateHelper],
  exports: [TypeOrmModule.forFeature([IngredientPlate])],
})
export class IngredientPlateModule {}
