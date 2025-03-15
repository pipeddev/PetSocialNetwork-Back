import { PartialType } from '@nestjs/swagger';

import { CreateHumanDto } 		from './create-human.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateHumanDto extends PartialType( CreateHumanDto ) {

	@IsUUID()
	@IsOptional()
	id?: string;

}
