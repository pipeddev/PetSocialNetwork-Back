import { Module } from '@nestjs/common';
import { CareTipsController } from './controllers/care-tips.controller';
import { CareTipsService } from './services/care-tips.service';
import { SelectCareTipsUC } from './services/use-cases/select-care-tips.uc';
import { CreateCareTipsUseCase } from './services/use-cases/create-care-tips.uc';
import { CareTipsRepository } from './models/repositories/care-tips.repository';
import { DeleteCareTipsUC } from './services/use-cases/delete-care-tips.uc';

@Module({
  controllers: [CareTipsController],
  providers: [
    CareTipsService,
    CreateCareTipsUseCase,
    SelectCareTipsUC,
    DeleteCareTipsUC,
    CareTipsRepository,
  ],
})
export class CareTipsModule {}
