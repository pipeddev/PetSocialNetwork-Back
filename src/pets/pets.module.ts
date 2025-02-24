import { Module } from '@nestjs/common';

import { PetsController }   from '@pets/pets.controller';
import { PetsService }      from '@pets/pets.service';


@Module({
    controllers : [PetsController],
    providers   : [PetsService],
})
export class PetsModule {}
