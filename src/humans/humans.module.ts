import { Module } from '@nestjs/common';

import { HumansService }		from '@humans/humans.service';
import { HumansController }	from '@humans/humans.controller';

@Module({
  controllers: [HumansController],
  providers  : [HumansService],
})
export class HumansModule {}
