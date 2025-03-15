import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

import { Ingredient } from './entities/ingredient.entity';

type Response = {
  message?: string;
  ingredient?: Ingredient;
  ingredients?: Ingredient[];
};

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Response> {
    try {
      const isIngredientPresent = await this.ingredientRepository.findOne({
        where: {
          name: createIngredientDto.name,
        },
      });

      if (isIngredientPresent) {
        throw new Error('Ya existe un ingrediente con ese nombre');
      }

      const newIngredient =
        await this.ingredientRepository.save(createIngredientDto);

      return {
        message: 'Ingrediente creado correctamente',
        ingredient: newIngredient,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Response> {
    try {
      const ingredients = await this.ingredientRepository.find();
      return {
        ingredients,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<Response> {
    try {
      const isIngredientPresent = await this.ingredientRepository.findOne({
        where: { id },
      });

      if (!isIngredientPresent) {
        throw new Error('No existe un ingrediente con ese id');
      }

      return {
        ingredient: isIngredientPresent,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    id: number,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Response> {
    try {
      const isIngredientPresent = await this.ingredientRepository.findOne({
        where: { id },
      });

      if (!isIngredientPresent) {
        throw new Error('No existe un ingrediente con ese id');
      }

      await this.ingredientRepository.update(id, updateIngredientDto);

      return {
        message: 'Ingrediente actualizado correctamente',
        ingredient: isIngredientPresent,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<Response> {
    try {
      const isIngredientPresent = await this.ingredientRepository.findOne({
        where: { id },
      });

      if (!isIngredientPresent) {
        throw new Error('No existe un ingrediente con ese id');
      }

      await this.ingredientRepository.delete(id);

      return {
        message: 'Ingrediente eliminado correctamente',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
