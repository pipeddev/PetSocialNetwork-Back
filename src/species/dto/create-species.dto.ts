import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSpeciesDto {

  @IsString()
	@IsNotEmpty()
	name: string;

  @IsString()
  @IsOptional()
  description?: string;

}
