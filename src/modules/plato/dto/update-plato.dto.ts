import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatoDto } from './create-plato.dto';

export class UpdatePlateDto extends PartialType(CreatePlatoDto) {}
