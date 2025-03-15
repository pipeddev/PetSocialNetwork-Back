import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { HumansService }	from './humans.service';
import { CreateHumanDto } from './dto/create-human.dto';
import { UpdateHumanDto } from './dto/update-human.dto';

@Controller('humans')
export class HumansController {
	constructor(private readonly humansService: HumansService) {}

	@Get(':id')
	findOne(
		@Param( 'id', ParseUUIDPipe ) id: string
	) {
		return this.humansService.findOne( id );
	}

	@Patch(':id')
	update(
		@Param( 'id', ParseUUIDPipe ) id: string,
		@Body() updateHumanDto: UpdateHumanDto
	) {
		return this.humansService.update( id, updateHumanDto );
	}

	@Delete(':id')
	remove(
		@Param( 'id', ParseUUIDPipe ) id: string
	) {
		return this.humansService.remove( id );
	}
}
