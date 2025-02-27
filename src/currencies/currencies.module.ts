import { Module } from '@nestjs/common';

import { CurrenciesService }    from '@currencies/currencies.service';
import { CurrenciesController } from '@currencies/currencies.controller';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
