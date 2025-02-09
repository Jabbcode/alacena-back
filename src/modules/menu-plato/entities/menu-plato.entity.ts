import { MealType } from '@/interfaces';
import { Menu } from '@/modules/menu/entities/menu.entity';
import { Plato } from '@/modules/plato/entities/plato.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuPlato {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Menu, (menu) => menu.menuPlatos, { onDelete: 'CASCADE' })
  menu: Menu;

  @ManyToOne(() => Plato, { onDelete: 'CASCADE' })
  plato: Plato;

  @Column('enum', { enum: MealType, nullable: true })
  categoria: MealType;
}
