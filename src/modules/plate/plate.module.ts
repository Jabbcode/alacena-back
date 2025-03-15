import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Plate } from './entities/plate.entity';

import { PlatesController } from './plates.controller';

import { PlatesService } from './plates.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plate])],
  controllers: [PlatesController],
  providers: [PlatesService],
  exports: [TypeOrmModule.forFeature([Plate])],
})
export class PlatesModule {}
