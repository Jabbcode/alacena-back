import { Plato } from '@/modules/plato/entities/plato.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToMany(() => Plato, { cascade: true })
  @JoinTable()
  desayuno?: Plato[];

  @ManyToMany(() => Plato, { cascade: true })
  @JoinTable()
  almuerzo?: Plato[];

  @ManyToMany(() => Plato, { cascade: true })
  @JoinTable()
  cena?: Plato[];
}
