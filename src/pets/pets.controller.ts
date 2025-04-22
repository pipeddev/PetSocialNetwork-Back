import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PetsService }	from '@pets/pets.service';
import { CreatePetDto } from '@pets/dto/create-pet.dto';
import { UpdatePetDto } from '@pets/dto/update-pet.dto';
import { AuthGuard } from '@auth/guards/auth.guard';
import { CurrentHuman } from '@auth/decorators/current-human.decorator';
import { HumanAuthDto } from '@humans/dto/user-auth.dto';


@ApiTags('Pets')
@Controller( 'pets' )
@ApiBearerAuth('access-token')
@UseGuards( AuthGuard )
export class PetsController {
	constructor(
		private readonly petsService: PetsService
	) {}

	@Post()
	create(
		@Body() createPetDto: CreatePetDto,
		@CurrentHuman() human: HumanAuthDto,
	) {
		return this.petsService.create( createPetDto, human );
	}

	@Get(':id')
	findMyFriends(
		@Param( 'id', ParseUUIDPipe ) id: string
	) {
		return this.petsService.findMyFriends( id );
	}

	@Get(':id')
	findOne(
		@Param( 'id', ParseUUIDPipe ) id: string
	) {
		return this.petsService.findOne( id );
	}

	@Patch(':id')
	update(
		@Param('id', ParseUUIDPipe ) id: string,
		@Body() updatePetDto: UpdatePetDto,
		@CurrentHuman() human: HumanAuthDto,
	) {
		return this.petsService.update( id, updatePetDto, human );
	}

	@Delete(':id')
	remove(
		@Param('id', ParseUUIDPipe) id: string,
		@CurrentHuman() human: HumanAuthDto,
	) {
		return this.petsService.remove( id, human );
	}
}
