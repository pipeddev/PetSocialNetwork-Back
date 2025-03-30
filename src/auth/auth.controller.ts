import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { SignUpDto } from '@auth/dto/signup.dto';
import { SignInDto } from '@auth/dto/signin.dto';

@Controller('auth')
export class AuthController {

	constructor(
		private readonly authService: AuthService
	) {}

  @HttpCode( HttpStatus.OK )
  @Post( 'sign-up' )
  signUp(
    @Body() signUpDto: SignUpDto
  ) {
    return this.authService.signUp( signUpDto );
  }

  @HttpCode( HttpStatus.OK )
  @Post( 'sign-in' )
  signIn(
    @Body() signInDto: SignInDto
  ) {
    return this.authService.signIn( signInDto );
  }

}
