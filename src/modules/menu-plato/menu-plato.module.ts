import { Module } from '@nestjs/common';
import { MenuPlatoService } from './menu-plato.service';
import { MenuPlatoController } from './menu-plato.controller';

@Module({
  controllers: [MenuPlatoController],
  providers: [MenuPlatoService],
})
export class MenuPlatoModule {}
