import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCareTipsDto {
  @ApiProperty({
    description: 'The name of the care tip',
    example: 'Bañar',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the care tip',
    example: 'Debe usar un shampoo especial para perros',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The type of the care tip',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

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
