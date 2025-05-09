import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateHumanDto {
	@ApiProperty({
    example: 'john_doe',
    description: 'The username of the human',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the human',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @ApiProperty({
    example: 'John',
    description: 'The first name of the human',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'The URL of the human\'s avatar',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @Length(0, 255)
  avatar?: string;

  @ApiPropertyOptional({
    example: '123 Main St',
    description: 'The address of the human',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'The phone number of the human',
    maxLength: 20,
  })
  @IsString()
  @IsOptional()
  @Length(0, 20)
  phone?: string;

  @ApiPropertyOptional({
    example: Gender.MALE,
    description: 'The gender of the human',
    enum: Gender,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

}