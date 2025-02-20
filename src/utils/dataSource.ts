import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { MenuPlato } from '@/modules/menu-plato/entities/menu-plato.entity';
import { Menu } from '@/modules/menu/entities/menu.entity';
import { Plato } from '@/modules/plato/entities/plato.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Plato, Menu, MenuPlato],
  synchronize: false, // Sincroniza automáticamente la estructura de la BD (NO USAR EN PRODUCCIÓN)
  logging: true,
  migrations: [],
});
