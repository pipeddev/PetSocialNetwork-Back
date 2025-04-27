import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	UseGuards,
	Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { PetsService }	from '@pets/pets.service';
import { CreatePetDto } from '@pets/dto/create-pet.dto';
import { UpdatePetDto } from '@pets/dto/update-pet.dto';
import { AuthGuard } from '@auth/guards/auth.guard';
import { CurrentHuman } from '@auth/decorators/current-human.decorator';
import { HumanAuthDto } from '@humans/dto/user-auth.dto';
import { PaginationDto } from '@common/dtos/pagination';
import { PaginationDoc } from '@common/dtos/pagination-doc';


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

	@Get('/friends/:id')
	@ApiQuery(PaginationDoc.PAGE)
	@ApiQuery(PaginationDoc.EACH)
	@ApiQuery(PaginationDoc.ORDER)
	@ApiOkResponse({ description: 'List of friends' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized' })
	findMyFriends(
		@Query() pagination: PaginationDto,
		@Param( 'id', ParseUUIDPipe ) id: string
	) {
		return this.petsService.findMyFriends( id, pagination );
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
