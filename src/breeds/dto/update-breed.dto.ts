import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { CreateBreedDto } from './create-breed.dto';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {

	@ApiProperty({ description: 'The ID of the species', example: 'c3e30d30-3e30-4230-b030-30d30c30e30d' })
	@IsString()
	@IsNotEmpty()
	id: string;

}
