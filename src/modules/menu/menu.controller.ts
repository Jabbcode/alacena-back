import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MealType } from '@/interfaces';

@Controller('api/v1/menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Put(':menuId/assign/:mealType/:platoId')
  assignPlatoToMenu(
    @Param('menuId') menuId: number,
    @Param('mealType') mealType: MealType,
    @Param('platoId') platoId: number,
  ) {
    return this.menuService.assignPlatoToMenu(menuId, mealType, platoId);
  }

  @Put(':menuId/remove/:mealType/:platoId')
  removePlatoFromMenu(
    @Param('menuId') menuId: number,
    @Param('mealType') mealType: MealType,
    @Param('platoId') platoId: number,
  ) {
    return this.menuService.removePlatoFromMenu(menuId, mealType, platoId);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.menuService.remove(id);
  }
}
