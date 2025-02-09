import { MenuPlato } from '@/modules/menu-plato/entities/menu-plato.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  @Index('IDX_MENU_FECHA', { unique: true })
  fecha: Date;

  @OneToMany(() => MenuPlato, (menuPlato) => menuPlato.menu, { cascade: true })
  menuPlatos: MenuPlato[];
}
