import { Module } from '@nestjs/common';

import { SpeciesService }			from '@species/species.service';
import { SpeciesController } 	from '@species/species.controller';

@Module({
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
