import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Ingredient } from '@/modules/ingredient/entities/ingredient.entity';
import { Plate } from '@/modules/plate/entities/plate.entity';
import { UnitType } from '@/interfaces';

@Entity()
@Index('IDX_INGREDIENTE_PLATO_UNIQUE_PLATO_INGREDIENTE', ['plate', 'info'], {
  unique: true,
})
export class IngredientPlate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plate, (plate) => plate.ingredients, {
    onDelete: 'CASCADE',
  })
  plate: Plate;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.platesIngredients, {
    onDelete: 'CASCADE',
  })
  info: Ingredient;

  @Column({ type: 'decimal', scale: 0.2, default: null })
  quantity: number;

  @Column({ type: 'enum', enum: UnitType, default: null })
  unit: UnitType;
}
