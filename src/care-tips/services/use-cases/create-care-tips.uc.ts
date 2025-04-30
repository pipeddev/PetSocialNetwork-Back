import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CareTip } from '@prisma/client';
import { CareTipsRepository } from 'src/care-tips/models/repositories/care-tips.repository';
import { CreateCareTipsDto } from '../dtos/requests/create-care-tips.dto';
import { validate } from 'class-validator';
import { CareTipDto } from '../dtos/responses/care-tip.dto';

@Injectable()
export class CreateCareTipsUseCase {
  constructor(private readonly careTipsRepository: CareTipsRepository) {}

  async execute(createCareTipsDto: CreateCareTipsDto): Promise<CareTipDto> {
    await validate(createCareTipsDto);
    const existingCareTip = await this.careTipsRepository.findByName(
      createCareTipsDto.name,
    );
    if (existingCareTip) {
      throw new ConflictException(
        `Care Tip with name ${createCareTipsDto.name} already exists`,
      );
    }
    const response = await this.careTipsRepository.create(createCareTipsDto);

    return CareTipDto.valueOf(response);
  }
}
