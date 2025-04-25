import { Body, Controller, Get, Post } from '@nestjs/common';
import { CareTip } from '@prisma/client';
import { CareTipsService } from './care-tips.service';
import { CreateCareTipsDto } from './dto/create-care-tips.dto';

@Controller('care-tips')
export class CareTipsController {
  constructor(private readonly caretipService: CareTipsService) {}

  @Post()
  create(@Body() createCareTipsDto: CreateCareTipsDto): Promise<CareTip> {
    return this.caretipService.create(createCareTipsDto);
  }

  @Get()
  findAll() {
    return this.caretipService.findAll();
  }
}
