import {
	Injectable,
	InternalServerErrorException,
	OnModuleInit,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { SignUpDto } from '@auth/dto/signup.dto';
import { SignInDto } from '@auth/dto/signin.dto';
import { HumanResponseDto } from '@auth/dto/human-response.dto';
import { HumanDto } from '@humans/dto/human.entity';
import { HumanAuthDto } from '@humans/dto/user-auth.dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

	constructor(
		private readonly jwtService: JwtService,
	) {
		super();
	}

	onModuleInit() {
		this.$connect();
	}

	#generateJwtToken( humanId: string ) {
		return this.jwtService.sign({ id: humanId }, { expiresIn: '4h' });
	}

	async signUp( signUpDto: SignUpDto ): Promise<HumanResponseDto> {
    try {
      const { password, ...userData } = signUpDto;
      const human = await this.human.create({
        data: {
          ...userData,
          password: bcrypt.hashSync( password, 10 )
        }
      });

			const { password: pass, ...rest } = human;

      return {
        human: rest as unknown as HumanDto,
        token: this.#generateJwtToken( human.id )
      };
    } catch ( error ) {
			throw new InternalServerErrorException( 'Error creating user' );
    }
  }

  async signIn( { password, email }: SignInDto ): Promise<HumanResponseDto> {
    const human = await this.human.findUnique({ where: { email }});

    if ( !human ) throw new UnauthorizedException( 'Credentials are not valid' );
    if ( !bcrypt.compareSync( password, human.password ))
      throw new UnauthorizedException( 'Credentials are not valid' );

		const { password: pass, ...rest } = human;

    return {
      human: rest as unknown as HumanDto,
      token: this.#generateJwtToken( human.id )
    };
  }

	async validate( humanId: string ) : Promise<HumanAuthDto> {
		const human = await this.human.findUnique({ where: { id: humanId }});

		if ( !human ) throw new UnauthorizedException( 'Unauthorized human.' );

		const { password, ...rest } = human as HumanDto;

		return rest as HumanAuthDto;
	}
}
