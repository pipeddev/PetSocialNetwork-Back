import { Injectable, NotFoundException } from '@nestjs/common';
import { CareTipsRepository } from 'src/care-tips/models/repositories/care-tips.repository';

@Injectable()
export class DeleteCareTipsUC {
  constructor(private readonly careTipsRepository: CareTipsRepository) {}

  async execute(id: string): Promise<void> {
    console.log('DeleteCareTipsUC', id);
    const careTip = await this.careTipsRepository.findById(id);
    if (!careTip) {
      throw new NotFoundException(`Care Tip with id ${id} not found`);
    }
    const response = await this.careTipsRepository.delete(id);
    console.log('DeleteCareTipsUC', response);
  }
}
