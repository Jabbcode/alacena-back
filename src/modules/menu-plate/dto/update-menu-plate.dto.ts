import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuPlateDto } from './create-menu-plate.dto';

export class UpdateMenuPlateDto extends PartialType(CreateMenuPlateDto) {}
