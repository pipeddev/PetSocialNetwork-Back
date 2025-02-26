import { Module } from '@nestjs/common';

import { AppController }    from './app.controller';
import { PetsModule }       from '@pets/pets.module';
import { SpeciesModule }    from '@species/species.module';

@Module({
  imports       : [PetsModule, SpeciesModule],
  controllers   : [AppController],
  providers     : [],
})
export class AppModule {}
