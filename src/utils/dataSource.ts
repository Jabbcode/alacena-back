import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { Menu } from '@/modules/menu/entities/menu.entity';
import { Plate } from '@/modules/plate/entities/plate.entity';
import { MenuPlate } from '@/modules/menu-plate/entities/menu-plate.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Plate, Menu, MenuPlate],
  synchronize: false, // Sincroniza automáticamente la estructura de la BD (NO USAR EN PRODUCCIÓN)
  logging: true,
  migrations: [],
});
