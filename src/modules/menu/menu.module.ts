import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './entities/menu.entity';
import { Plato } from '../plato/entities/plato.entity';
import { MenuPlato } from '../menu-plato/entities/menu-plato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, MenuPlato, Plato])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [TypeOrmModule.forFeature([Menu])],
})
export class MenusModule {}
