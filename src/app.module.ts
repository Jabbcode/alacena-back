import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
      entities: [__dirname + '/**/.entity{.ts,.js}'],
      synchronize: true, // Sincroniza automáticamente la estructura de la BD (NO USAR EN PRODUCCIÓN)
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
