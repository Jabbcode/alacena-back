import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsOptional()
  purchaseDate: Date;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
