import { Test, TestingModule } from '@nestjs/testing';
import { CareTipsController } from './care-tips.controller';

describe('CareTipsController', () => {
  let controller: CareTipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareTipsController],
    }).compile();

    controller = module.get<CareTipsController>(CareTipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
