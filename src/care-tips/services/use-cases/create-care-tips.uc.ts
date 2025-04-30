import { Injectable } from '@nestjs/common';
import { CareTip } from '@prisma/client';
import { CareTipsRepository } from 'src/care-tips/models/repositories/care-tips.repository';
import { CreateCareTipsDto } from '../dtos/create-care-tips.dto';
import { validate } from 'class-validator';

@Injectable()
export class CreateCareTipsUseCase {
  constructor(private readonly careTipsRepository: CareTipsRepository) {}

  async execute(createCareTipsDto: CreateCareTipsDto): Promise<string> {
    await validate(createCareTipsDto);
    return 'Care tip created successfully!';
  }
}
