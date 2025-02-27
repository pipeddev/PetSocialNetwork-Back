import { Module } from '@nestjs/common';

import { AppController }    from './app.controller';
import { PetsModule }       from '@pets/pets.module';
import { SpeciesModule }    from '@species/species.module';
import { BreedsModule }    	from '@breeds/breeds.module';
import { CurrenciesModule } from '@currencies/currencies.module';

@Module({
  imports       : [PetsModule, SpeciesModule, BreedsModule, CurrenciesModule],
  controllers   : [AppController],
  providers     : [],
})
export class AppModule {}
