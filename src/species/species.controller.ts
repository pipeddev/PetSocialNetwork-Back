import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { Species } from '@prisma/client';

import { SpeciesService }		from '@species/species.service';
import { CreateSpeciesDto } from '@species/dto/create-species.dto';
import { UpdateSpeciesDto } from '@species/dto/update-species.dto';

@Controller( 'species' )
export class SpeciesController {
	constructor(
		private readonly speciesService: SpeciesService
	) {}

	@Post()
	create(
		@Body() createSpeciesDto: CreateSpeciesDto
	): Promise<Species> {
		return this.speciesService.create( createSpeciesDto );
	}

	@Get()
	findAll(): Promise<Species[]> {
		return this.speciesService.findAll();
	}

	@Get(':id')
	findOne(
		@Param( 'id', ParseUUIDPipe ) id: string
	): Promise<Species> {
		return this.speciesService.findOne( id );
	}

	@Patch(':id')
	update(
		@Param( 'id', ParseUUIDPipe ) id: string,
		@Body() updateSpeciesDto: UpdateSpeciesDto
	): Promise<Species> {
		return this.speciesService.update( id, updateSpeciesDto );
	}

	@Delete(':id')
	remove(
		@Param( 'id', ParseUUIDPipe ) id: string
	): Promise<Species> {
		return this.speciesService.remove( id );
	}
}
