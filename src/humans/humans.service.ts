import { Injectable, OnModuleInit } from '@nestjs/common';

import { Human, PrismaClient } from '@prisma/client';

import { UpdateHumanDto } from './dto/update-human.dto';
import { HumanAuthDto } from './dto/user-auth.dto';
import { PrismaException } from '@config/prisma-catch';

@Injectable()
export class HumansService extends PrismaClient implements OnModuleInit {

	onModuleInit() {
		this.$connect();
	}

	#humanToHumanDto(human: Human): UpdateHumanDto {
		const { password, ...rest } = human;

		return rest as UpdateHumanDto;
	}

	async update(
		updateHumanDto: UpdateHumanDto,
		currentHuman: HumanAuthDto,
	): Promise<UpdateHumanDto> {
		try {
			const human = await this.human.update({
				where: { id: currentHuman.id },
				data: updateHumanDto
			});

			return this.#humanToHumanDto( human );
		} catch (error) {
			throw PrismaException.catch( error );
		}
	}

	async remove( currentHuman: HumanAuthDto ): Promise<UpdateHumanDto> {
		await this.human.delete({ where: { id: currentHuman.id }});

		return currentHuman;
	}
}
