import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FilterMenuDto } from './dto/filter-menu.dto';

@Controller('/menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
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
