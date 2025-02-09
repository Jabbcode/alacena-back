import { Injectable } from '@nestjs/common';
import { CreateMenuPlatoDto } from './dto/create-menu-plato.dto';
import { UpdateMenuPlatoDto } from './dto/update-menu-plato.dto';

@Injectable()
export class MenuPlatoService {
  create(createMenuPlatoDto: CreateMenuPlatoDto) {
    return 'This action adds a new menuPlato';
  }

  findAll() {
    return `This action returns all menuPlato`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuPlato`;
  }

  update(id: number, updateMenuPlatoDto: UpdateMenuPlatoDto) {
    return `This action updates a #${id} menuPlato`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuPlato`;
  }
}
