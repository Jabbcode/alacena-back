import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateComidaDto } from './dto/create-comida.dto';
import { UpdateComidaDto } from './dto/update-comida.dto';

import { Comida } from './entities/comida.entity';

@Injectable()
export class ComidasService {
  constructor(
    @InjectRepository(Comida) private comidaRepository: Repository<Comida>,
  ) {}

  async create(createComidaDto: CreateComidaDto): Promise<Comida> {
    return await this.comidaRepository.save(createComidaDto);
  }

  async findAll(): Promise<Comida[]> {
    return await this.comidaRepository.find();
  }

  async findOne(id: number): Promise<Comida> {
    return await this.comidaRepository.findOneBy({ id });
  }

  async update(id: number, updateComidaDto: UpdateComidaDto): Promise<Comida> {
    return (await this.comidaRepository.update(id, updateComidaDto)).raw;
  }

  async remove(id: number): Promise<Comida> {
    return (await this.comidaRepository.delete(id)).raw;
  }
}
