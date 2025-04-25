import { Test, TestingModule } from '@nestjs/testing';
import { CareTipsService } from './care-tips.service';

describe('CareTipsService', () => {
  let service: CareTipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareTipsService],
    }).compile();

    service = module.get<CareTipsService>(CareTipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
