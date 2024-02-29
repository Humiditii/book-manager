import { Module } from '@nestjs/common';
import { BookManagerController } from './book-manager.controller';
import { BookManagerService } from './book-manager.service';

@Module({
  controllers: [BookManagerController],
  providers: [BookManagerService],
})
export class BookManagerModule {}
