import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Menu } from '@/modules/menu/entities/menu.entity';
import { Plate } from '@/modules/plate/entities/plate.entity';

export class MenuPlateHelper {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Plate) private plateRepository: Repository<Plate>,
  ) {}
  getMenu = async (menuId: number) => {
    const menu = await this.menuRepository.findOne({
      where: { id: menuId },
      relations: ['menuPlates', 'menuPlates.plate'],
    });

    if (!menu) {
      throw new Error('Menu no encontrado');
    } else {
      return menu;
    }
  };

  getMenuForDate = async (date: Date) => {
    return await this.menuRepository.findOne({
      where: { date },
      relations: ['menuPlates', 'menuPlates.plate'],
    });
  };

  getPlate = async (plateId: number) => {
    const plate = await this.plateRepository.findOneBy({ id: plateId });

    if (!plate) {
      throw new Error('Plato no encontrado');
    } else {
      return plate;
    }
  };
}
