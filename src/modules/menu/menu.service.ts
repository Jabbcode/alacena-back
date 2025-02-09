import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

import { Menu } from './entities/menu.entity';
import { Plato } from '../plato/entities/plato.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Plato) private platoRepository: Repository<Plato>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    return await this.menuRepository.save(createMenuDto);
  }

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find({
      relations: ['desayuno', 'almuerzo', 'cena'],
    });
  }

  async findOne(id: number): Promise<Menu> {
    return await this.menuRepository.findOne({
      where: { id },
      relations: ['desayuno', 'almuerzo', 'cena'],
    });
  }

  async assignPlatoToMenu(
    menuId: number,
    mealType: 'desayuno' | 'almuerzo' | 'cena',
    platoId: number,
  ): Promise<Menu> {
    const menu = await this.getMenu(menuId, mealType);
    const plato = await this.getPlato(platoId);

    if (menu[mealType].some((plato) => plato.id === platoId)) {
      throw new Error('Plato already assigned to menu');
    }

    menu[mealType].push(plato);
    return this.menuRepository.save(menu);
  }

  async removePlatoFromMenu(
    menuId: number,
    mealType: 'desayuno' | 'almuerzo' | 'cena',
    platoId: number,
  ): Promise<Menu> {
    const menu = await this.getMenu(menuId, mealType);

    await this.getPlato(platoId);

    menu[mealType] = menu[mealType].filter(
      (plato) => plato.id !== Number(platoId),
    );

    return this.menuRepository.save(menu);
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    return (await this.menuRepository.update(id, updateMenuDto)).raw;
  }

  async remove(id: number): Promise<Menu> {
    return (await this.menuRepository.delete(id)).raw;
  }

  async getMenu(menuId: number, mealType: 'desayuno' | 'almuerzo' | 'cena') {
    const menu = await this.menuRepository.findOne({
      where: { id: menuId },
      relations: [mealType],
    });

    if (!menu) {
      throw new Error('Menu not found');
    } else {
      return menu;
    }
  }

  async getPlato(platoId: number) {
    const plato = await this.platoRepository.findOneBy({ id: platoId });

    if (!plato) {
      throw new Error('Plato not found');
    } else {
      return plato;
    }
  }
}
