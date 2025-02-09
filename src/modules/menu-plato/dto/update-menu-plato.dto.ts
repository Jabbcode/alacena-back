import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuPlatoDto } from './create-menu-plato.dto';

export class UpdateMenuPlatoDto extends PartialType(CreateMenuPlatoDto) {}
