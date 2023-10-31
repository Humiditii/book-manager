import { Test, TestingModule } from '@nestjs/testing';
import { BookManagerController } from '../book-manager.controller';

describe('BookManagerController', () => {
  let controller: BookManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookManagerController],
    }).compile();

    controller = module.get<BookManagerController>(BookManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
