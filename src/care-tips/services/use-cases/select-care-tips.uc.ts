import { Injectable, NotFoundException } from '@nestjs/common';
import { CareTipsRepository } from '../../models/repositories/care-tips.repository';
import { CareTipDto } from '../dtos/responses/care-tip.dto';

@Injectable()
export class SelectCareTipsUC {
  constructor(private readonly careTipsRepository: CareTipsRepository) {}

  async findAll(): Promise<CareTipDto[]> {
    const response = await this.careTipsRepository.findAll();

    return response.map((careTip) => CareTipDto.valueOf(careTip));
  }

  async findById(id: string): Promise<CareTipDto> {
    const response = await this.careTipsRepository.findById(id);
    if (!response) {
      throw new NotFoundException(`Care Tip with id ${id} not found`);
    }
    return CareTipDto.valueOf(response);
  }
}
