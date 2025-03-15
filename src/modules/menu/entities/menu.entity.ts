import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MenuPlate } from '@/modules/menu-plate/entities/menu-plate.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  @Index('IDX_MENU_FECHA', { unique: true })
  date: Date;

  @OneToMany(() => MenuPlate, (menuPlate) => menuPlate.menu, { cascade: true })
  menuPlates: MenuPlate[];
}
