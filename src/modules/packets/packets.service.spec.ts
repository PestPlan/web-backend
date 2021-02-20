import { Test, TestingModule } from '@nestjs/testing';
import { PacketsService } from './packets.service';

describe('PacketsService', () => {
  let service: PacketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacketsService],
    }).compile();

    service = module.get<PacketsService>(PacketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
