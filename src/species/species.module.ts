import { Module } from '@nestjs/common';

import { AuthModule } from '@auth/auth.module';
import { SpeciesService }			from '@species/species.service';
import { SpeciesController } 	from '@species/species.controller';

@Module({
  controllers	: [SpeciesController],
  providers		: [SpeciesService],
	imports			: [AuthModule]

})
export class SpeciesModule {}
