import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateCurrencyDto {
	@ApiProperty({
		description: 'ISO 4217 code of the currency',
		example: 'USD'
	})
	@IsString()
	code: string;

	@ApiProperty({
		description: 'Full name of the currency',
		example: 'US Dollar'
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: 'Country code of the currency',
		example: 'US'
	})
	@IsString()
	countryCode: string;

	@ApiProperty({
		description: 'Indicates if the currency uses fixed decimals',
		example: true
	})
	@IsBoolean()
	useFixedDecimals: boolean;

	@ApiProperty({
		description: 'Number of decimal places',
		example: 2
	})
	@IsInt()
	decimalPlaces: number;

	@ApiProperty({
		description: 'Locale format for the currency',
		example: 'en-US'
	})
	@IsString()
	locale: string;

	@ApiProperty({
		description: 'Symbol of the currency',
		example: '$',
		required: false
	})
	@IsOptional()
	@IsString()
	symbol?: string;

}
