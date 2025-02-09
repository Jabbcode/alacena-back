import { Module } from '@nestjs/common';
import { PlatosService } from './platos.service';
import { PlatosController } from './platos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plato } from './entities/plato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plato])],
  controllers: [PlatosController],
  providers: [PlatosService],
  exports: [TypeOrmModule.forFeature([Plato])],
})
export class PlatosModule {}
