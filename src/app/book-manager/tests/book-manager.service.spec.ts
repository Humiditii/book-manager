import { Test, TestingModule } from '@nestjs/testing';
import { BookManagerService } from '../book-manager.service';

describe('BookManagerService', () => {
  let service: BookManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookManagerService],
    }).compile();

    service = module.get<BookManagerService>(BookManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
