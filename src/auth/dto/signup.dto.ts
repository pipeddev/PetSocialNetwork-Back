import { ApiProperty } from '@nestjs/swagger';

import { IsString, Length } from 'class-validator';

import { SignInDto } from '@auth/dto/signin.dto';

export class SignUpDto extends SignInDto {

	@ApiProperty({
    example: 'Username of the human',
    description: 'The username of the human',
    minLength: 5,
    maxLength: 100,
	})
	@IsString()
	@Length( 5, 100 )
  username: string;

}
