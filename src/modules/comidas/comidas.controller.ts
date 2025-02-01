import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComidasService } from './comidas.service';
import { CreateComidaDto } from './dto/create-comida.dto';
import { UpdateComidaDto } from './dto/update-comida.dto';

@Controller('api/v1/comidas')
export class ComidasController {
  constructor(private readonly comidasService: ComidasService) {}

  @Post()
  create(@Body() createComidaDto: CreateComidaDto) {
    return this.comidasService.create(createComidaDto);
  }

  @Get()
  findAll() {
    return this.comidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comidasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateComidaDto: UpdateComidaDto) {
    return this.comidasService.update(id, updateComidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.comidasService.remove(id);
  }
}
