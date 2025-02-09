import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlateDto } from './dto/update-plato.dto';

@Controller('api/v1/platos')
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Post()
  create(@Body() createPlatoDto: CreatePlatoDto) {
    return this.platosService.create(createPlatoDto);
  }

  @Get()
  findAll() {
    return this.platosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.platosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePlatoDto: UpdatePlateDto) {
    return this.platosService.update(id, updatePlatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.platosService.remove(id);
  }
}
