import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuPlatoService } from './menu-plato.service';
import { CreateMenuPlatoDto } from './dto/create-menu-plato.dto';
import { UpdateMenuPlatoDto } from './dto/update-menu-plato.dto';

@Controller('menu-plato')
export class MenuPlatoController {
  constructor(private readonly menuPlatoService: MenuPlatoService) {}

  @Post()
  create(@Body() createMenuPlatoDto: CreateMenuPlatoDto) {
    return this.menuPlatoService.create(createMenuPlatoDto);
  }

  @Get()
  findAll() {
    return this.menuPlatoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuPlatoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuPlatoDto: UpdateMenuPlatoDto,
  ) {
    return this.menuPlatoService.update(+id, updateMenuPlatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuPlatoService.remove(+id);
  }
}
