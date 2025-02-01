import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposComidaService } from './tipos-comida.service';
import { TiposComidaController } from './tipos-comida.controller';
import { TiposComida } from './entities/tipos-comida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TiposComida])],
  controllers: [TiposComidaController],
  providers: [TiposComidaService],
})
export class TiposComidaModule {}
