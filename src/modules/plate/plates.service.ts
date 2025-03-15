import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';

import { Plate } from './entities/plate.entity';

@Injectable()
export class PlatesService {
  constructor(
    @InjectRepository(Plate) private plateRepository: Repository<Plate>,
  ) {}

  async create(createPlateDto: CreatePlateDto): Promise<Plate> {
    const isPresentPlate = await this.plateRepository.findOne({
      where: {
        name: createPlateDto.name,
      },
    });

    if (isPresentPlate) {
      throw new Error('Ya existe un plato con ese nombre');
    }

    return await this.plateRepository.save(createPlateDto);
  }

  async findAll(): Promise<Plate[]> {
    return await this.plateRepository.find({
      relations: ['ingredients', 'ingredients.info'],
    });
  }

  async findOne(id: number): Promise<Plate> {
    return await this.plateRepository.findOne({
      where: { id },
      relations: ['ingredients', 'ingredients.info'],
    });
  }

  async update(id: number, updatePlateDto: UpdatePlateDto): Promise<Plate> {
    await this.plateRepository.update(id, updatePlateDto);
    return await this.plateRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.plateRepository.delete(id);
  }
}
