import { Injectable } from '@nestjs/common';
import { CreateCareTipsUseCase } from './use-cases/create-care-tips.uc';
import { CreateCareTipsDto } from './dtos/requests/create-care-tips.dto';
import { SelectCareTipsUC } from './use-cases/select-care-tips.uc';
import { CareTipDto } from './dtos/responses/care-tip.dto';
import { DeleteCareTipsUC } from './use-cases/delete-care-tips.uc';

@Injectable()
export class CareTipsService {
  constructor(
    private readonly createCareTipsUc: CreateCareTipsUseCase,
    private readonly selectCareTipsUc: SelectCareTipsUC,
    private readonly deleteCareTipsUC: DeleteCareTipsUC,
  ) {}

  async create(createCareTipsDto: CreateCareTipsDto): Promise<any> {
    return this.createCareTipsUc.execute(createCareTipsDto);
  }

  async findAll(): Promise<CareTipDto[]> {
    return this.selectCareTipsUc.findAll();
  }

  async findById(id: string): Promise<CareTipDto> {
    return this.selectCareTipsUc.findById(id);
  }

  async delete(id: string): Promise<any> {
    return this.deleteCareTipsUC.execute(id);
  }
}
