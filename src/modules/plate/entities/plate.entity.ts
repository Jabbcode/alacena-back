import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IngredientPlate } from '@/modules/ingredient-plate/entities/ingredient-plate.entity';

@Entity()
export class Plate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: null })
  description: string;

  @OneToMany(
    () => IngredientPlate,
    (ingredientPlate) => ingredientPlate.plate,
    { cascade: true },
  )
  ingredients: IngredientPlate[];
}
