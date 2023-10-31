import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

type Book = {
  id: string;
  title: string;
  price: number;
};

@Injectable()
export class BookMemoryStore {
  private books: Book[];

  constructor() {
    this.books = [];
  }

  create(book: Omit<Book, 'id'>) {
    const newBook: Book = { ...book, id: uuidv4() };
    this.books.push(newBook);
    return newBook;
  }

  all() {
    return this.books;
  }

  findOne(id: string) {
    const book = this.books.find((b) => b.id === id);
    return book ? book : null;
  }

  update(id: string, data: Omit<Book, 'id'>) {
    const bookIndex = this.books.findIndex((b) => b.id == id);
    if (bookIndex < 0) {
      return null;
    }

    Object.keys(data).map((key) => {
      this.books[bookIndex][key] = data[key];
    });

    return this.books[bookIndex];
  }

  delete(id: string) {
    const bookIndex = this.books.findIndex((b) => b.id == id);
    if (bookIndex < 0) {
      return null;
    }
    const book = this.books[bookIndex];
    this.books.splice(bookIndex, 1);
    return book;
  }
}
