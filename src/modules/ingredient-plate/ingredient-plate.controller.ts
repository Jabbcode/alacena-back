import { Controller, Body, Param, Put } from '@nestjs/common';

import { CreateIngredientPlateDto } from './dto/create-ingredient-plate.dto';

import { IngredientPlateService } from './ingredient-plate.service';

@Controller('/ingredient-plate')
export class IngredientPlateController {
  constructor(
    private readonly ingredientPlateService: IngredientPlateService,
  ) {}

  @Put('/assign/:plateId/:ingredientId')
  assignPlateToMenu(
    @Param('ingredientId') ingredientId: number,
    @Param('plateId') plateId: number,
    @Body() createIngredientPlateDto: CreateIngredientPlateDto,
  ) {
    return this.ingredientPlateService.assignIngredientToPlate(
      createIngredientPlateDto,
      plateId,
      ingredientId,
    );
  }

  @Put(':plateId/remove/:ingredientId')
  removeIngredientFromPlate(
    @Param('plateId') plateId: number,
    @Param('ingredientId') ingredientId: number,
  ) {
    return this.ingredientPlateService.removeIngredientFromPlate(
      plateId,
      ingredientId,
    );
  }
}
