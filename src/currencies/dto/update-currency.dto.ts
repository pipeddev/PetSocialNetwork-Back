import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsString } from 'class-validator';

import { CreateCurrencyDto } from './create-currency.dto';


export class UpdateCurrencyDto extends PartialType( CreateCurrencyDto ) {
  @ApiProperty({
		description: 'Unique identifier for the currency',
		example: '82ec39a3-3d2c-4d2d-a0f1-6b12f445a2bf'
	})
	@IsString()
	id: string;

}
