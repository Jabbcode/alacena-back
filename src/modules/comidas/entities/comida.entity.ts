import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TiposComida } from '@/modules/tipos-comida/entities/tipos-comida.entity';
import { PlanComida } from '@/modules/plan-comida/entities/plan-comida.entity';

@Entity()
export class Comida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => TiposComida, (tiposComida) => tiposComida.comidas)
  tipoComida: TiposComida;

  @OneToMany(() => PlanComida, (planComida) => planComida.comidas)
  planComida: PlanComida[];
}
