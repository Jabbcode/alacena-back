import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './entities/menu.entity';
import { MenuPlate } from '../menu-plate/entities/menu-plate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuPlate])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [TypeOrmModule.forFeature([Menu])],
})
export class MenusModule {}
