import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IngredientPlate } from '@/modules/ingredient-plate/entities/ingredient-plate.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: new Date() })
  purchaseDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => IngredientPlate, (ingredientPlate) => ingredientPlate.info, {
    cascade: true,
  })
  platesIngredients: IngredientPlate[];
}
