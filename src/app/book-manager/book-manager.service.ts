import { Injectable, NotFoundException } from '@nestjs/common';
import { BookMemoryStore } from 'src/shared/db';

import { BookDTO } from './dto/book.dto';

@Injectable()
export class BookManagerService {
  constructor(private bookStore: BookMemoryStore) {}
  async createBook(data: BookDTO) {
    const book = this.bookStore.create(data);
    return book;
  }

  async listBooks() {
    return this.bookStore.all();
  }

  async oneBook(id: string) {
    const book = this.bookStore.findOne(id);
    if (!book) {
      throw new NotFoundException('Book does not exist');
    }
    return book;
  }

  async updateBook(id: string, data: BookDTO) {
    const updatedBook = this.bookStore.update(id, data);
    if (!updatedBook) {
      throw new NotFoundException('Book does not exist');
    }
    return updatedBook;
  }

  async deleteBook(id: string) {
    const deletedBook = this.bookStore.delete(id);
    if (!deletedBook) {
      throw new NotFoundException('Book does not exist');
    }
    return deletedBook;
  }
}
