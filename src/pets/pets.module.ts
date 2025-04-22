import { Module } from '@nestjs/common';

import { AuthModule }			from '@auth/auth.module';
import { PetsController }	from '@pets/pets.controller';
import { PetsService }		from '@pets/pets.service';

@Module({
	controllers : [PetsController],
	providers   : [PetsService],
	imports			: [AuthModule]

})
export class PetsModule {}
