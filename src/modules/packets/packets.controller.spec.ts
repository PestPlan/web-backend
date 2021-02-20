import { Test, TestingModule } from '@nestjs/testing';
import { PacketsController } from './packets.controller';

describe('PacketsController', () => {
  let controller: PacketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacketsController],
    }).compile();

    controller = module.get<PacketsController>(PacketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
