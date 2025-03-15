import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Menu } from '@/modules/menu/entities/menu.entity';
import { Plate } from '@/modules/plate/entities/plate.entity';

import { MealType } from '@/interfaces';

@Entity()
export class MenuPlate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Menu, (menu) => menu.menuPlates, { onDelete: 'CASCADE' })
  menu: Menu;

  @ManyToOne(() => Plate, { onDelete: 'CASCADE' })
  plate: Plate;

  @Column('enum', { enum: MealType, nullable: true })
  category: MealType;
}
