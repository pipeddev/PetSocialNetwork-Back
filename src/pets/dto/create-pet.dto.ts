import { ApiProperty } from '@nestjs/swagger';

import { Gender, Size } from '@prisma/client';

import {
	IsBoolean,
	IsDateString,
	IsDecimal,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID
} from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ description: 'The name of the pet', example: 'Luna' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Unique username for the pet', example: 'luna123' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Birthdate of the pet in ISO format', example: '2020-05-10' })
  @IsDateString()
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty({ description: 'ID of the breed', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
  @IsString()
  @IsNotEmpty()
  breedId: string;

  @ApiProperty({ description: 'Size of the pet', enum: Size, example: 'MEDIUM' })
  @IsEnum(Size)
  @IsNotEmpty()
  size: Size;

  @ApiProperty({ description: 'Gender of the pet', enum: Gender, example: 'FEMALE' })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  // Campos opcionales relevantes
  @ApiProperty({ description: 'Avatar URL of the pet', example: 'https://example.com/luna.jpg', required: false })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: 'Color of the pet', example: 'Black', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ description: 'Whether the pet is neutered', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  neutered?: boolean;

  @ApiProperty({ description: 'Whether the pet is vaccinated', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  vaccinated?: boolean;

  @ApiProperty({ description: 'Whether the pet is sterilized', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  sterilized?: boolean;

  @ApiProperty({ description: 'Temperament of the pet', example: 'Playful', required: false })
  @IsString()
  @IsOptional()
  temperament?: string;

  @ApiProperty({ description: 'Location of the pet', example: 'Mexico City', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ description: 'Description of the pet', example: 'A lovely dog', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  // Campos de adopción/compra
  @ApiProperty({ description: 'Whether the pet was adopted', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isAdopted?: boolean;

  @ApiProperty({ description: 'Whether the pet was bought', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isBought?: boolean;

  @ApiProperty({ description: 'Adoption date in ISO format', example: '2021-06-15', required: false })
  @IsDateString()
  @IsOptional()
  adoptionDate?: string;

  @ApiProperty({ description: 'Purchase date in ISO format', example: '2020-01-10', required: false })
  @IsDateString()
  @IsOptional()
  boughtDate?: string;

  // Campos de venta/adopción
  @ApiProperty({ description: 'Whether the pet is for sale', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isForSale?: boolean;

  @ApiProperty({ description: 'Whether the pet is for adoption', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isForAdoption?: boolean;

  @ApiProperty({ description: 'Sale price of the pet', example: '19.99', required: false })
  @IsDecimal()
  @IsOptional()
  forSalePrice?: number;

  @ApiProperty({ description: 'Currency ID for the sale price', example: 'uuid-of-usd', required: false })
  @IsOptional()
	@IsUUID()
  currencyId?: string;

  @ApiProperty({ description: 'Date when pet was put for sale', example: '2023-01-01', required: false })
  @IsDateString()
  @IsOptional()
  forSaleDate?: string;

  @ApiProperty({ description: 'Date when pet was put for adoption', example: '2023-02-01', required: false })
  @IsDateString()
  @IsOptional()
  forAdoptionDate?: string;
}
