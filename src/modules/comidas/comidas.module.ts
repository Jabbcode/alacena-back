import { Module } from '@nestjs/common';
import { ComidasService } from './comidas.service';
import { ComidasController } from './comidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comida } from './entities/comida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comida])],
  controllers: [ComidasController],
  providers: [ComidasService],
})
export class ComidasModule {}
