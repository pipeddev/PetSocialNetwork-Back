import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { ENVS } from '@config/envs';

@Module({
controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
  exports: [ JwtStrategy, PassportModule, JwtModule ],
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),

		JwtModule.register({
			global: true,
			secret: ENVS.JWT_SECRET
		}),
	]
})
export class AuthModule {}
