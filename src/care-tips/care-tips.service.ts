import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CareTip, Prisma, PrismaClient } from '@prisma/client';
import { CreateCareTipsDto } from './dto/create-care-tips.dto';

@Injectable()
export class CareTipsService extends PrismaClient implements OnModuleInit {
  #logger = new Logger(CareTipsService.name);

  async onModuleInit() {
    await this.$connect();
    this.#logger.log('***Connected to DB***');
  }

  async findAll(): Promise<CareTip[]> {
    return await this.careTip.findMany();
  }

  async create(createCareTipsDto: CreateCareTipsDto): Promise<CareTip> {
    await this.#valid(createCareTipsDto);

    return this.careTip.create({
      data: createCareTipsDto,
    });
  }

  async #valid(careTipDto: CreateCareTipsDto) {
    const breed = await this.careTip.findUnique({
      where: { name: careTipDto.name } as Prisma.CareTipWhereUniqueInput,
    });

    if (breed)
      throw new BadRequestException(
        `Care Tipss with name ${careTipDto.name} already exists.`,
      );
  }
}
