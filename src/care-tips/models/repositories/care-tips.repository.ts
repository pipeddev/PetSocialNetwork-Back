import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CareTip, Prisma, PrismaClient } from '@prisma/client';
import { CreateCareTipsDto } from 'src/care-tips/services/dtos/requests/create-care-tips.dto';

@Injectable()
export class CareTipsRepository extends PrismaClient implements OnModuleInit {
  #logger = new Logger(CareTipsRepository.name);

  async onModuleInit() {
    await this.$connect();
  }

  async findAll(): Promise<CareTip[]> {
    return await this.careTip.findMany();
  }

  async create(createCareTipsDto: CreateCareTipsDto): Promise<CareTip> {
    return this.careTip.create({
      data: createCareTipsDto,
    });
  }

  async delete(id: string): Promise<CareTip> {
    this.#logger.log(`ID recibido para eliminar: ${id}`);
    return this.careTip.delete({
      where: { id: id },
    });
  }

  async findById(id: string): Promise<CareTip | null> {
    return this.careTip.findUnique({
      where: { id: id },
    });
  }

  async findByName(name: string): Promise<CareTip | null> {
    return this.careTip.findUnique({
      where: { name: name },
    });
  }
}
