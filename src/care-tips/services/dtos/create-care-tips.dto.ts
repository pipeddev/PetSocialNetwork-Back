import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCareTipsDto {
  @ApiProperty({
    description: 'The name of the care tip',
    example: 'Bañar',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'The description of the care tip',
    example: 'Debe usar un shampoo especial para perros',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The type of the care tip',
    enum: Type,
    example: 'BASIC_CARE',
  })
  @IsEnum(Type)
  @IsNotEmpty()
  type: Type;

  @ApiProperty({
    description: 'The tips of the care tip',
    example: ['Shampoo', 'Esponja'],
  })
  @IsArray()
  tips: string[];

  @ApiProperty({
    description: 'Add video, image or audio of tip',
    example: '',
  })
  @IsString()
  @IsOptional()
  mediaUrl?: string;
}
