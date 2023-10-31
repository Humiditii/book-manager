import { Global, Module } from '@nestjs/common';
import { BookMemoryStore } from './bookMemoryStore.service';

@Global()
@Module({
  providers: [BookMemoryStore],
  exports: [BookMemoryStore],
})
export class DbModule {}
