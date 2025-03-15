import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateMenuPlateDto } from './dto/create-menu-plate.dto';
import { CreateMenuDto } from '../menu/dto/create-menu.dto';

import { MenuPlate } from './entities/menu-plate.entity';
import { Menu } from '../menu/entities/menu.entity';

import { MenuPlateHelper } from './helpers/menu-plate.helper';

import { MealType } from '@/interfaces';

@Injectable()
export class MenuPlateService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(MenuPlate)
    private menuPlateRepository: Repository<MenuPlate>,
    private menuPlateHelper: MenuPlateHelper,
  ) {}

  async assignPlateToMenu(
    mealType: MealType,
    plateId: number,
    createMenuDto: CreateMenuDto,
  ): Promise<Menu> {
    let menu: Menu = null;
    let id: number = null;

    const isPresentMenu = await this.menuPlateHelper.getMenuForDate(
      createMenuDto.date,
    );
    const plateFound = await this.menuPlateHelper.getPlate(plateId);

    if (isPresentMenu === null) {
      menu = await this.menuRepository.save(createMenuDto);
      id = menu.id;
    } else {
      menu = await this.menuPlateHelper.getMenuForDate(createMenuDto.date);
      id = menu.id;

      const existingMenuPlato = menu.menuPlates.find(
        (mp) => mp.plate.id === plateFound.id && mp.category === mealType,
      );

      if (existingMenuPlato) {
        throw new Error(
          'El plato ya está asignado a esta categoría en el menú',
        );
      }
    }

    if (!Object.values(MealType).includes(mealType)) {
      throw new Error('Categoría no válida');
    }

    const newMenuPlato: CreateMenuPlateDto = this.menuPlateRepository.create({
      menu,
      category: mealType,
      plate: plateFound,
    });

    await this.menuPlateRepository.save(newMenuPlato);

    return this.menuRepository.findOne({
      where: { id },
      relations: ['menuPlates', 'menuPlates.plate'],
    });
  }

  async removePlateFromMenu(
    menuId: number,
    mealType: MealType,
    plateId: number,
  ): Promise<Menu> {
    await this.menuPlateHelper.getMenu(menuId);
    await this.menuPlateHelper.getPlate(plateId);

    await this.menuPlateRepository.delete({
      menu: { id: menuId },
      plate: { id: plateId },
      category: mealType,
    });

    return this.menuRepository.findOne({
      where: { id: menuId },
      relations: ['menuPlates', 'menuPlates.plate'],
    });
  }
}
