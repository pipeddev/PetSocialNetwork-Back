import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '@auth/interfaces/jwt-payload.interface';
import { AuthService } from '@auth/auth.service';
import { ENVS } from '@config/envs';
import { HumanDto } from '@humans/dto/human.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

	constructor(
		private readonly authService: AuthService,
	) {
		super({
			secretOrKey: ENVS.JWT_SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate( payload: JwtPayload ): Promise<HumanDto> {
		const { id } = payload;
		const human = await this.authService.validate( id );

		if ( !human ) throw new UnauthorizedException( 'Token not valid' );

		return human as HumanDto;
	}

}