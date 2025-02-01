import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposComidaDto } from './create-tipos-comida.dto';

export class UpdateTiposComidaDto extends PartialType(CreateTiposComidaDto) {}
