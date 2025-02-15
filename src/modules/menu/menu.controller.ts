import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MealType } from '@/interfaces';
import { FilterMenuDto } from './dto/filter-menu.dto';

@Controller('api/v1/menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Put('/assign/:mealType/:platoId')
  assignPlatoToMenu(
    @Param('mealType') mealType: MealType,
    @Param('platoId') platoId: number,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    return this.menuService.assignPlatoToMenu(mealType, platoId, createMenuDto);
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

  @Post('/search')
  @HttpCode(200)
  async findByFilter(@Body() filters: FilterMenuDto) {
    return await this.menuService.findByFilter(filters);
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
