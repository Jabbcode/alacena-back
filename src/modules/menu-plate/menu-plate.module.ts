import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuPlateService } from './menu-plate.service';

import { MenuPlateController } from './menu-plate.controller';

import { MenuPlate } from './entities/menu-plate.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Plate } from '../plate/entities/plate.entity';

import { MenuPlateHelper } from './helpers/menu-plate.helper';

@Module({
  imports: [TypeOrmModule.forFeature([MenuPlate, Menu, Plate])],
  controllers: [MenuPlateController],
  providers: [MenuPlateService, MenuPlateHelper],
})
export class MenuPlateModule {}
