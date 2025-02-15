import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMenuDto } from './dto/create-menu.dto';

import { Menu } from './entities/menu.entity';
import { Plato } from '../plato/entities/plato.entity';
import { MenuPlato } from '../menu-plato/entities/menu-plato.entity';
import { MealType } from '@/interfaces';
import { CreateMenuPlatoDto } from '../menu-plato/dto/create-menu-plato.dto';
import { FilterMenuDto } from './dto/filter-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Plato) private platoRepository: Repository<Plato>,
    @InjectRepository(MenuPlato)
    private menuPlatoRepository: Repository<MenuPlato>,
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
      relations: ['menuPlatos', 'menuPlatos.plato'],
    });
  }

  async findByFilter(filters: FilterMenuDto): Promise<Menu[]> {
    const query = this.menuRepository.createQueryBuilder('menu');

    query.leftJoinAndSelect('menu.menuPlatos', 'menuPlatos');
    query.leftJoinAndSelect('menuPlatos.plato', 'plato');

    if (filters.fecha) {
      query.andWhere('menu.fecha = :fecha', { fecha: filters.fecha });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Menu> {
    return await this.menuRepository.findOne({
      where: { id },
      relations: ['menuPlatos', 'menuPlatos.plato'],
    });
  }

  async assignPlatoToMenu(
    menuId: number,
    mealType: MealType,
    platoId: number,
  ): Promise<Menu> {
    const menu = await this.getMenu(menuId);
    const plato = await this.getPlato(platoId);

    if (!Object.values(MealType).includes(mealType)) {
      throw new Error('Categoría no válida');
    }

    const existingMenuPlato = menu.menuPlatos.find(
      (mp) => mp.plato.id === plato.id && mp.categoria === mealType,
    );

    if (existingMenuPlato) {
      throw new Error('El plato ya está asignado a esta categoría en el menú');
    }

    const newMenuPlato: CreateMenuPlatoDto =
      await this.menuPlatoRepository.create({
        menu,
        categoria: mealType,
        plato,
      });

    await this.menuPlatoRepository.save(newMenuPlato);

    return this.menuRepository.findOne({
      where: { id: menuId },
      relations: ['menuPlatos', 'menuPlatos.plato'],
    });
  }

  async removePlatoFromMenu(
    menuId: number,
    mealType: MealType,
    platoId: number,
  ): Promise<Menu> {
    await this.getMenu(menuId);
    await this.getPlato(platoId);

    await this.menuPlatoRepository.delete({
      menu: { id: menuId },
      plato: { id: platoId },
      categoria: mealType,
    });

    return this.menuRepository.findOne({
      where: { id: menuId },
      relations: ['menuPlatos', 'menuPlatos.plato'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }

  async getMenu(menuId: number) {
    const menu = await this.menuRepository.findOne({
      where: { id: menuId },
      relations: ['menuPlatos', 'menuPlatos.plato'],
    });

    if (!menu) {
      throw new Error('Menu no encontrado');
    } else {
      return menu;
    }
  }

  async getPlato(platoId: number) {
    const plato = await this.platoRepository.findOneBy({ id: platoId });

    if (!plato) {
      throw new Error('Plato no encontrado');
    } else {
      return plato;
    }
  }
}
