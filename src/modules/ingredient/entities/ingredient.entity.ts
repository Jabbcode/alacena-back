import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IngredientPlate } from '@/modules/ingredient-plate/entities/ingredient-plate.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => IngredientPlate, (ingredientPlate) => ingredientPlate.info, {
    cascade: true,
  })
  platesIngredients: IngredientPlate[];
}
