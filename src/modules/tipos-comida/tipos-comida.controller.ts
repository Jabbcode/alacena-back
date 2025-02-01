import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TiposComidaService } from './tipos-comida.service';
import { CreateTiposComidaDto } from './dto/create-tipos-comida.dto';
import { UpdateTiposComidaDto } from './dto/update-tipos-comida.dto';

@Controller('api/v1/tipos-comida')
export class TiposComidaController {
  constructor(private readonly tiposComidaService: TiposComidaService) {}

  @Post()
  create(@Body() createTiposComidaDto: CreateTiposComidaDto) {
    return this.tiposComidaService.create(createTiposComidaDto);
  }

  @Get()
  findAll() {
    return this.tiposComidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tiposComidaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTiposComidaDto: UpdateTiposComidaDto,
  ) {
    return this.tiposComidaService.update(+id, updateTiposComidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tiposComidaService.remove(id);
  }
}
