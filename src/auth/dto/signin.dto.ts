import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class SignInDto {

	@ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the human',
    minLength: 5,
    maxLength: 100,
	})
	@IsString()
	@IsEmail()
	@Length( 5, 100 )
	email: string;

	@ApiProperty({
    example: 'securePassword123!',
    description: 'The password of the human',
    minLength: 8,
    maxLength: 50,
  })
	@IsString()
	@Length( 8, 50 )
	@Matches(
		/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'The password must have a Uppercase, lowercase letter and a number'
	})
	password: string;

}
