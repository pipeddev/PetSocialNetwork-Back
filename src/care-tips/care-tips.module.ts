import { Module } from '@nestjs/common';
import { CareTipsController } from './care-tips.controller';
import { CareTipsService } from './care-tips.service';

@Module({
  controllers: [CareTipsController],
  providers: [CareTipsService],
})
export class CareTipsModule {}
