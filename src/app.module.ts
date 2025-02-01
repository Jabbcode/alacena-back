import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TiposComidaModule } from './modules/tipos-comida/tipos-comida.module';
import { ComidasModule } from './modules/comidas/comidas.module';
import { PlanComidaModule } from './modules/plan-comida/plan-comida.module';

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
      entities: [join(__dirname, '/modules', '**', '*.entity{.ts,.js}')],
      synchronize: true, // Sincroniza automáticamente la estructura de la BD (NO USAR EN PRODUCCIÓN)
      logging: true,
    }),
    TiposComidaModule,
    ComidasModule,
    PlanComidaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
