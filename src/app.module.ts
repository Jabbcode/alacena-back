import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { MenusModule } from './modules/menu/menu.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { PlatesModule } from './modules/plate/plate.module';
import { IngredientPlateModule } from './modules/ingredient-plate/ingredient-plate.module';
import { MenuPlateModule } from './modules/menu-plate/menu-plate.module';

import { Menu } from './modules/menu/entities/menu.entity';
import { Plate } from './modules/plate/entities/plate.entity';
import { Ingredient } from './modules/ingredient/entities/ingredient.entity';
import { IngredientPlate } from './modules/ingredient-plate/entities/ingredient-plate.entity';
import { MenuPlate } from './modules/menu-plate/entities/menu-plate.entity';

import { environmentVariablesSchema } from './schemas/environmentVariablesSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}`.trim() + '.env'],
      validationSchema: environmentVariablesSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Plate, Menu, MenuPlate, Ingredient, IngredientPlate],
      autoLoadEntities: true,
      synchronize: true, // Sincroniza automáticamente la estructura de la BD (NO USAR EN PRODUCCIÓN)
      logging: true,
      migrations: [],
      ssl: true,
    }),
    PlatesModule,
    MenusModule,
    IngredientModule,
    IngredientPlateModule,
    MenuPlateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
