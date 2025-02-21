import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlateDto } from './dto/update-plato.dto';

import { Plato } from './entities/plato.entity';

@Injectable()
export class PlatosService {
  constructor(
    @InjectRepository(Plato) private platoRepository: Repository<Plato>,
  ) {}

  async create(createPlatoDto: CreatePlatoDto): Promise<Plato> {
    const existePlato = await this.platoRepository.findOne({
      where: {
        nombre: createPlatoDto.nombre,
      },
    });

    if (existePlato) {
      throw new Error('Ya existe un plato con ese nombre');
    }

    return await this.platoRepository.save(createPlatoDto);
  }

  async findAll(): Promise<Plato[]> {
    return await this.platoRepository.find();
  }

  async findOne(id: number): Promise<Plato> {
    return await this.platoRepository.findOneBy({ id });
  }

  async update(id: number, updatePlatoDto: UpdatePlateDto): Promise<Plato> {
    await this.platoRepository.update(id, updatePlatoDto);
    return await this.platoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.platoRepository.delete(id);
  }
}
