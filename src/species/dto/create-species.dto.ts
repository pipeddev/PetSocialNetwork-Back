import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSpeciesDto {

	@ApiProperty({
		description	: 'The name of the species',
		example			: 'Canine'
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		description	: 'The description of the species',
		example			: 'A large species',
		required		: false
	})
	@IsString()
	@IsOptional()
	description?: string;

}
