import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { CreatePetDto } from '@pets/dto/create-pet.dto';
import { UpdatePetDto } from '@pets/dto/update-pet.dto';


@Injectable()
export class PetsService extends PrismaClient implements OnModuleInit{

	#logger = new Logger( PetsService.name );

	onModuleInit() {
		this.$connect();
		this.#logger.log( '***Connected to DB***' );
	}

	create( createPetDto: CreatePetDto ) {
		return this.pet.create({
			data: createPetDto
		});
  }

  findAll() {
    return `This action returns all pets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
