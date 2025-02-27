import { Module } from '@nestjs/common';

import { BreedsService }    from '@breeds/breeds.service';
import { BreedsController } from '@breeds/breeds.controller';

@Module({
  controllers: [BreedsController],
  providers: [BreedsService],
})
export class BreedsModule {}
