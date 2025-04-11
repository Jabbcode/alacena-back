import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMenuDto } from './dto/create-menu.dto';
import { FilterMenuDto } from './dto/filter-menu.dto';

import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    try {
      const newMenu = this.menuRepository.create(createMenuDto);
      return await this.menuRepository.save(newMenu);
    } catch (error) {
      if (error?.code === '23505') {
        throw new ConflictException('Ya existe un menú con la misma fecha');
      }
      throw error;
    }
  }

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find({
      relations: ['menuPlates', 'menuPlates.plate'],
    });
  }

  async findByFilter(filters: FilterMenuDto): Promise<Menu[]> {
    const query = this.menuRepository.createQueryBuilder('menu');

    query.leftJoinAndSelect('menu.menuPlates', 'menuPlates');
    query.leftJoinAndSelect('menuPlates.plate', 'plate');

    if (filters.date) {
      query.andWhere('menu.date = :date', { date: filters.date });
    }

    if (filters.startDate) {
      query.andWhere('menu.date >= :startDate', {
        startDate: filters.startDate,
      });
    }

    if (filters.endDate) {
      query.andWhere('menu.date <= :endDate', { endDate: filters.endDate });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Menu> {
    return await this.menuRepository.findOne({
      where: { id },
      relations: ['menuPlates', 'menuPlates.plate'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
}
