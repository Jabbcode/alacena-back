import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { PlatosModule } from './modules/plato/plato.module';
import { MenusModule } from './modules/menu/menu.module';

import { Menu } from './modules/menu/entities/menu.entity';
import { Plato } from './modules/plato/entities/plato.entity';
import { MenuPlato } from './modules/menu-plato/entities/menu-plato.entity';
// import { MenuPlatoModule } from './modules/menu-plato/menu-plato.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Plato, Menu, MenuPlato],
      synchronize: false, // Sincroniza automáticamente la estructura de la BD (NO USAR EN PRODUCCIÓN)
      logging: true,
    }),
    PlatosModule,
    MenusModule,
    // MenuPlatoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
