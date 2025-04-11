import { Controller, Body, Param, Put } from '@nestjs/common';

import { MenuPlateService } from './menu-plate.service';

import { CreateMenuDto } from '../menu/dto/create-menu.dto';

import { MealType } from '@/interfaces';

@Controller('/menu-plate')
export class MenuPlateController {
  constructor(private readonly menuPlateService: MenuPlateService) {}

  @Put('/assign/:mealType/:plateId')
  assignPlatoToMenu(
    @Param('mealType') mealType: MealType,
    @Param('plateId') plateId: number,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    return this.menuPlateService.assignPlateToMenu(
      mealType,
      plateId,
      createMenuDto,
    );
  }

  @Put(':menuId/remove/:mealType/:plateId')
  removePlatoFromMenu(
    @Param('menuId') menuId: number,
    @Param('mealType') mealType: MealType,
    @Param('plateId') plateId: number,
  ) {
    return this.menuPlateService.removePlateFromMenu(menuId, mealType, plateId);
  }
}
