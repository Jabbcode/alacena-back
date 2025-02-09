import { MenuPlato } from '@/modules/menu-plato/entities/menu-plato.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @OneToMany(() => MenuPlato, (menuPlato) => menuPlato.menu, { cascade: true })
  menuPlatos: MenuPlato[];
}
