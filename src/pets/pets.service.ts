import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
	OnModuleInit
} from '@nestjs/common';

import { Pet, PrismaClient } from '@prisma/client';

import { CreatePetDto } from '@pets/dto/create-pet.dto';
import { UpdatePetDto } from '@pets/dto/update-pet.dto';


@Injectable()
export class PetsService extends PrismaClient implements OnModuleInit {

	#logger = new Logger( PetsService.name );

	onModuleInit() {
		this.$connect();
		this.#logger.log( '***Connected to DB***' );
	}

	async create( createPetDto: CreatePetDto ): Promise<Pet> {
		const pet = await this.pet.findFirst({
			where: { username: createPetDto.username },
			select: { username: true }
		});

		if ( pet?.username ) throw new BadRequestException( `Pet with username ${ createPetDto.username } already exists` );

		return await this.pet.create({
			data: createPetDto
		});
	}

	async findAll(): Promise<Pet[]> {
		return await this.pet.findMany({
			where: { isDeleted: false },
			include: {
				friends: {
					where: { isDeleted: false },
					include: {
						friend: true,
					},
				},
			},
		});
	}

	async findOne( id: string ): Promise<Pet> {
		const pet = await this.pet.findUnique({
			where: { id, isDeleted: false },
			include: {
				friends: {
					where: { isDeleted: false },
					include: {
						friend: true,
					},
				},
			},
		});

		if ( !pet ) throw new NotFoundException( `Pet with id ${ id } not found` );

		return pet;
	}

	async update(
		id: string,
		{ breedId, currencyId, ...rest }: UpdatePetDto
	): Promise<Pet> {
		const pet = await this.findOne( id );

		if ( pet.username !== rest.username ) throw new BadRequestException( `Pet can't change the username` );

		return this.pet.update({
      where: { id },
      data: {
				...rest,
        ...(breedId && { breed: { connect: { id: breedId } } }),
        ...(currencyId && { currency: { connect: { id: currencyId } } }),
      },
      include: {
        breed: true,
        friends: { include: { friend: true } },
        currency: true
      },
    });
	}

	async remove( id: string ): Promise<Pet> {
		const pet = await this.findOne( id );

		await this.pet.update({
			where: { id },
			data: { isDeleted: true },
		});

		pet.isDeleted = true;

		return pet;
	}
}
