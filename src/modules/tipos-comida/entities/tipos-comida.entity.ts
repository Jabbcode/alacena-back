import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comida } from '@/modules/comidas/entities/comida.entity';

@Entity()
export class TiposComida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Comida, (comida) => comida.tipoComida)
  comidas: Comida[];
}
