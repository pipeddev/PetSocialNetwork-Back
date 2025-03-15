import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { Human, PrismaClient } from '@prisma/client';

import { CreateHumanDto } from './dto/create-human.dto';
import { UpdateHumanDto } from './dto/update-human.dto';
import { HumanDto }				from './dto/human.dto';

@Injectable()
export class HumansService extends PrismaClient implements OnModuleInit {

	onModuleInit() {
		this.$connect();
	}

	#humanToHumanDto(human: Human): HumanDto {
		const { password, ...rest } = human;

		return rest as HumanDto;
	}

	async #validHuman( human: CreateHumanDto | UpdateHumanDto ): Promise<void> {
		const existHuman = await this.human
		.findUnique({ where: {
			username: human.username,
			email		: human.email
		}});

		if ( existHuman ) throw new BadRequestException( `Human already exists` );
	}

	async findOne( id: string ): Promise<HumanDto> {
		const human = await this.human.findUnique({ where: { id } });

		if ( !human ) throw new NotFoundException( `Human not found` );

		return this.#humanToHumanDto( human );
	}

	async update( id: string, updateHumanDto: UpdateHumanDto ): Promise<HumanDto> {
		await this.findOne( id );
		await this.#validHuman( updateHumanDto );

		const human = await this.human.update({
			where: { id },
			data: updateHumanDto
		});

		return this.#humanToHumanDto( human );
	}

	async remove( id: string ): Promise<HumanDto> {
		const human = await this.findOne( id );

		await this.human.delete({ where: { id }});

		return human;
	}
}
