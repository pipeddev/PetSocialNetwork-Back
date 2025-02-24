import { Module } from '@nestjs/common';

import { AppController }    from './app.controller';
import { PetsModule }       from '@pets/pets.module';

@Module({
  imports       : [PetsModule],
  controllers   : [AppController],
  providers     : [],
})
export class AppModule {}
