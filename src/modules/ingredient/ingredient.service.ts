import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

import { Ingredient } from './entities/ingredient.entity';

type Response = {
  message?: string;
  ingredient?: Ingredient | UpdateResult;
  ingredients?: Ingredient[];
};

type ResponsePagination = {
  ingredients: Ingredient[];
  total: number;
  currentPage: number;
  totalPages: number;
};

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  create(createIngredientDto: CreateIngredientDto): Promise<Response> {
    return this.ingredientRepository.manager.transaction(async (manager) => {
      const isIngredientPresent = await manager.findOne(Ingredient, {
        where: {
          name: createIngredientDto.name,
        },
      });

      if (isIngredientPresent) {
        throw new ConflictException('Ya existe un ingrediente con ese nombre');
      }

      const newIngredient = await manager.save(Ingredient, {
        name: createIngredientDto.name,
        purchaseDate: new Date(),
        isActive: true,
      });

      return {
        message: 'Ingrediente creado correctamente',
        ingredient: newIngredient,
      };
    });
  }

  findAll(page: number = 1, limit: number = 10): Promise<ResponsePagination> {
    const skip = Number((page - 1) * limit);
    return this.ingredientRepository.manager.transaction(async (manager) => {
      const [ingredients, total] = await manager.findAndCount(Ingredient, {
        skip,
        take: limit,
      });

      return {
        ingredients,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    });
  }

  findOne(id: number): Promise<Response> {
    return this.ingredientRepository.manager.transaction(async (manager) => {
      const isIngredientPresent = await manager.findOne(Ingredient, {
        where: { id },
      });
      if (!isIngredientPresent) {
        throw new NotFoundException(`No existe un ingrediente con el id ${id}`);
      }
      return {
        ingredient: isIngredientPresent,
      };
    });
  }

  update(
    id: number,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Response> {
    return this.ingredientRepository.manager.transaction(async (manager) => {
      const isIngredientPresent = await manager.findOne(Ingredient, {
        where: { id },
      });

      if (!isIngredientPresent) {
        throw new NotFoundException('No existe un ingrediente con ese id');
      }

      await manager.update(Ingredient, id, updateIngredientDto);

      const updateIngredient = await manager.findOne(Ingredient, {
        where: { id },
      });

      return {
        message: 'Ingrediente actualizado correctamente',
        ingredient: updateIngredient,
      };
    });
  }

  async renewIngredient(id: number) {
    try {
      const isIngredientPresent = await this.ingredientRepository.findOne({
        where: { id },
      });

      if (!isIngredientPresent) {
        throw new Error('No existe un ingrediente con ese id');
      }

      isIngredientPresent.purchaseDate = new Date();
      isIngredientPresent.isActive = true;

      await this.ingredientRepository.save(isIngredientPresent);

      return {
        message: 'Ingrediente renovado correctamente',
        ingredient: isIngredientPresent,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async cancelIngreident(id: number): Promise<Response> {
    try {
      const isIngredientPresent = await this.ingredientRepository.findOne({
        where: { id },
      });

      if (!isIngredientPresent) {
        throw new Error('No existe un ingrediente con ese id');
      }

      isIngredientPresent.isActive = false;

      await this.ingredientRepository.save(isIngredientPresent);

      return {
        message:
          'Ingrediente actualizado correctamente, Debe renovar este ingrediente',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
