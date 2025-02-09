import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
