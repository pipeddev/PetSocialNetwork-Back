import { Module } from '@nestjs/common';
import { CareTipsController } from './controllers/care-tips.controller';
import { CareTipsService } from './services/care-tips.service';

@Module({
  controllers: [CareTipsController],
  providers: [CareTipsService],
})
export class CareTipsModule {}
