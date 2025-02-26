import {
	BadRequestException,
	Injectable,
	NotFoundException,
	OnModuleInit
} from '@nestjs/common';

import { PrismaClient, Species } from '@prisma/client';

import { CreateSpeciesDto } from '@species/dto/create-species.dto';
import { UpdateSpeciesDto } from '@species/dto/update-species.dto';

@Injectable()
export class SpeciesService extends PrismaClient implements OnModuleInit {

	onModuleInit() {
		this.$connect();
	}

	async #findByName( name: string ): Promise<void> {
		const specie = await this.species.findFirst({
			where: { name },
			select: { name: true }
		});

		if ( specie?.name ) throw new BadRequestException( `Specie with name ${ name } already exists` );
	}

	async create( createSpeciesDto: CreateSpeciesDto ): Promise<Species> {
		await this.#findByName( createSpeciesDto.name );

		return await this.species.create({
			data: createSpeciesDto
		});
	}

	findAll() {
		return this.species.findMany();
	}

	async findOne( id: string ): Promise<Species> {
		const specie = await this.species.findUnique({
			where: { id }
		});

		if ( !specie ) throw new NotFoundException( `Species with id ${ id } not found` );

		return specie;
	}

	async update(
		id: string,
		updateSpeciesDto: UpdateSpeciesDto
	): Promise<Species> {
		const specie = await this.findOne( id );

		if ( updateSpeciesDto.name && updateSpeciesDto.name !== specie.name )
			await this.#findByName( updateSpeciesDto.name );

		return await this.species.update({
			where: { id },
			data: updateSpeciesDto
		});
	}

	async remove(id: string): Promise<Species> {
		await this.findOne( id );

		return await this.species.delete({
			where: { id }
		});
	}

}
