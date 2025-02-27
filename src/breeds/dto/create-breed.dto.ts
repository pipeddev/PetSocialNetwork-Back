import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBreedDto {

	@ApiProperty({ description: 'The name of the breed', example: 'Sheltie' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'The description of the breed', example: 'A small breed' })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty({ description: 'The ID of the species', example: 'c3e30d30-3e30-4230-b030-30d30c30e30d' })
	@IsString()
	@IsNotEmpty()
	speciesId: string;

}
