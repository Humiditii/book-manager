import { Module } from '@nestjs/common';
import { BookManagerModule } from './app/book-manager/book-manager.module';
import { DbModule } from './shared/db';

@Module({
  imports: [BookManagerModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
