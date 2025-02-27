import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { Currency, PrismaClient } from '@prisma/client';

import { CreateCurrencyDto } from '@currencies/dto/create-currency.dto';
import { UpdateCurrencyDto } from '@currencies/dto/update-currency.dto';

@Injectable()
export class CurrenciesService extends PrismaClient implements OnModuleInit {
	onModuleInit() {
		this.$connect();
	}

	async #validCode(
		currencyDto: CreateCurrencyDto | UpdateCurrencyDto
	): Promise<void> {
		if ( !currencyDto.code ) return;

		const currency = await this.currency.findUnique({
			where: { code: currencyDto.code }
		})

		if ( currency ) throw new BadRequestException( `Currency with code ${ currencyDto.code } already exists` );
	}

	async create(
		createCurrencyDto: CreateCurrencyDto
	): Promise<Currency> {
		await this.#validCode( createCurrencyDto );

		return this.currency.create({
			data: createCurrencyDto
		});
	}

	async findAll(): Promise<Currency[]> {
		return await this.currency.findMany();
	}

	async findOne(id: string): Promise<Currency> {
		const currency = await this.currency.findUnique({
			where: { id }
		})

		if ( !currency ) throw new NotFoundException( `Currency whit id ${id} not found.` );

		return currency;
	}

	async update(
		id: string,
		updateCurrencyDto: UpdateCurrencyDto
	): Promise<Currency> {
		await this.findOne( id );
		await this.#validCode( updateCurrencyDto );

		return await this.currency.update({
			where: { id },
			data: updateCurrencyDto
		})
	}

	async remove(id: string): Promise<Currency> {
		await this.findOne( id );

		return await this.currency.delete({
			where: {id}
		})
	}
}
