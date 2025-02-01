import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTiposComidaDto } from './dto/create-tipos-comida.dto';
import { UpdateTiposComidaDto } from './dto/update-tipos-comida.dto';

import { TiposComida } from './entities/tipos-comida.entity';

@Injectable()
export class TiposComidaService {
  constructor(
    @InjectRepository(TiposComida)
    private tipoComidaRepository: Repository<TiposComida>,
  ) {}

  async create(createTiposComidaDto: CreateTiposComidaDto) {
    return await this.tipoComidaRepository.save(createTiposComidaDto);
  }

  async findAll(): Promise<TiposComida[]> {
    return await this.tipoComidaRepository.find();
  }

  async findOne(id: number): Promise<TiposComida> {
    return await this.tipoComidaRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateTiposComidaDto: UpdateTiposComidaDto,
  ): Promise<TiposComida> {
    const updateTipoComida = await this.tipoComidaRepository.update(
      id,
      updateTiposComidaDto,
    );
    return updateTipoComida.raw;
  }

  async remove(id: number): Promise<TiposComida> {
    return (await this.tipoComidaRepository.delete(id)).raw;
  }
}
