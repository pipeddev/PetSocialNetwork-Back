import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CareTipsService } from '../services/care-tips.service';
import { CreateCareTipsDto } from '../services/dtos/requests/create-care-tips.dto';
import { CareTipDto } from '../services/dtos/responses/care-tip.dto';

@Controller('care-tips')
export class CareTipsController {
  constructor(private readonly caretipService: CareTipsService) {}

  @Post()
  create(@Body() createCareTipsDto: CreateCareTipsDto): Promise<CareTipDto> {
    try {
      return this.caretipService.create(createCareTipsDto);
    } catch (error) {
      throw new Error(`Error creating care tip: ${error.message}`);
    }
  }

  @Get()
  findAll() {
    try {
      return this.caretipService.findAll();
    } catch (error) {
      throw new Error(`Error Finding all care tips: ${error.message}`);
    }
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<CareTipDto> {
    try {
      return this.caretipService.findById(id);
    } catch (error) {
      throw new Error(`Error finding care tip: ${error.message}`);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.caretipService.delete(id);
    } catch (error) {
      throw new Error(`Error deleting care tip: ${error.message}`);
    }
  }
}
