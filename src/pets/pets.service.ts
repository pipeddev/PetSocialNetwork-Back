import {
	ForbiddenException,
	Injectable,
	Logger,
	NotFoundException,
	OnModuleInit
} from '@nestjs/common';

import { Pet, PrismaClient } from '@prisma/client';

import { PaginationDto } from '@common/dtos/pagination';
import { PrismaException } from '@config/prisma-catch';
import { CreatePetDto } from '@pets/dto/create-pet.dto';
import { UpdatePetDto } from '@pets/dto/update-pet.dto';
import { HumanAuthDto } from '@humans/dto/user-auth.dto';
import { PetFriendResponse } from './dto/pet-friends.dto';


@Injectable()
export class PetsService extends PrismaClient implements OnModuleInit {

	#logger = new Logger( PetsService.name );

	onModuleInit() {
		this.$connect();
		this.#logger.log( '***Connected to DB***' );
	}

	async create(
		createPetDto: CreatePetDto,
		human: HumanAuthDto
	): Promise<Pet> {
		if ( createPetDto.humanId !== human.id ) {
			throw new ForbiddenException( 'You do not have permits for this pet' );
		}

		try {
			return await this.pet.create({
				data: createPetDto
			});
		} catch (error) {
			throw PrismaException.catch( error );
		}
	}

	extractFriends = ( entries : { friends : { friend: Pet }[] }[] ): Pet[] =>
		entries.flatMap( entry => entry.friends.map( f => f.friend ) );

	async findMyFriends(
		id: string,
		{ page, each, order }: PaginationDto
  ): Promise<PetFriendResponse[]> {
		await this.findOne( id );

		return await this.petFriend.findMany({
			take    : each,
			skip    : page * each,
			orderBy : { createdAt: order },
			where   : { isDeleted: false, petId: id },
			select : {
				friend: true,
				isBlocked: true,
				isDeleted: true,
				createdAt: true,
				blockedAt: true
			}
		});
	}

	async findOne( id: string ): Promise<Pet> {
		const pet = await this.pet.findFirst({
			where: { id, isDeleted: false },
		});

		if ( !pet ) throw new NotFoundException( `Pet with id ${ id } not found` );

		return pet;
	}

	async update(
		id: string,
		{ breedId, currencyId, ...rest }: UpdatePetDto,
		human: HumanAuthDto
	): Promise<Pet> {
		const pet = await this.findOne( id );

		if ( pet.humanId !== human.id ) throw new ForbiddenException( 'You are not allowed to update this pet' );

		try {
			return await this.pet.update({
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
		} catch (error) {
			throw PrismaException.catch( error, 'Pet' );
		}
	}

	async remove( id: string, human: HumanAuthDto ): Promise<Pet> {
		const pet = await this.findOne( id );

		if ( pet.humanId !== human.id ) {
			throw new ForbiddenException( 'You are not allowed to delete this pet' );
		}

		await this.pet.update({
			where: { id },
			data: { isDeleted: true },
		});

		pet.isDeleted = true;

		return pet;
	}
}
