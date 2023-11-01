import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

type Book = {
  id: string;
  title: string;
  price: number;
};

export type SortOrder = {
  field: keyof Book;
  order: 'asc' | 'desc';
};

type WhereOperators = {
  $in?: [string | number];
  $gte?: string | number;
  $gt?: string | number;
};

type WhereFields = {
  [Property in keyof Book]?: WhereOperators;
};

type FindManyOptions = {
  select?: [keyof Book];
  order?: SortOrder;
  where?: WhereFields;
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

  createMany(books: Omit<Book, 'id'>[]) {
    const newBooks: Book[] = [];

    books.forEach((b) => {
      const created = this.create(b);
      newBooks.push(created);
    });

    return newBooks;
  }

  /**
   * Query book store for books. If the options parameter is specified the book store goes through some filters
   that match the specified options.
   @param options Options to pass record through.
   */
  findMany(options?: FindManyOptions) {
    let books = this.books;
    if (!options) {
      return books;
    }
    if (options.where) {
      books = this.applyWhereClause(books, options.where);
    }
    if (options.order) {
      books = this.applySort(books, options.order);
    }
    if (options.select) {
      return this.filterKeys(books, options.select);
    }
    return books;
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

  /**
   * Apply filtering on a books array based on the passed clause. This effectively filters the array based on the properties of the clause
   * argument.
   * @param data Data to run filter on
   * @param clause Clause to filter with
   */
  private applyWhereClause(data: Book[], clauseFields: WhereFields) {
    const d = data.filter((e) => {
      // Says whether this element is going to be returned. The value will likely get changed during clause evaluation
      let elementReturns: boolean = true;
      Object.keys(clauseFields).forEach((field) => {
        const f = clauseFields[field];
        Object.keys(f).every((clause) => {
          // Stop evaluating clauses if one has already failed for this element
          if (!elementReturns) {
            return false;
          }

          switch (clause) {
            case '$gt':
              elementReturns = e[field] > f[clause];
              break;
            case '$gte':
              elementReturns = e[field] >= f[clause];
              break;
            case '$in':
              const x = f[clause];
              elementReturns = x.includes(e[field]);
              break;
          }

          return true;
        });
      });
      return elementReturns;
    });
    return d;
  }

  private applySort(data: Book[], sort: SortOrder) {
    return data.sort((a, b) => {
      if (sort.order === 'asc') {
        if (a[sort.field] < b[sort.field]) {
          return -1;
        }

        if (a[sort.field] > b[sort.field]) {
          return 1;
        }
        return 0;
      } else {
        if (a[sort.field] < b[sort.field]) {
          return 1;
        }

        if (a[sort.field] > b[sort.field]) {
          return -1;
        }
        return 0;
      }
    });
  }

  /**
   * Remove properties that are not in the specified fields.
   * @param data Resources to run key filter on
   * @param fields Fields to include in the final data
   */
  private filterKeys(data: Book[], fields: [string]) {
    const b = data.map((v) => {
      Object.keys(v).forEach((k) => {
        if (!fields.includes(k)) {
          delete v[k];
        }
      });
      return v;
    });
    return b;
  }
}
