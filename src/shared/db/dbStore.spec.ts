import { BookMemoryStore } from './bookMemoryStore.service';

describe('BookStore core functionalities', () => {
  it('books are added and read', () => {
    const store = new BookMemoryStore();
    store.create({ title: 'Test title', price: 1000 });
    const books = store.findMany();
    expect(books.length).toEqual(1);
  });

  it('Many books can be added at once', () => {
    const store = new BookMemoryStore();
    store.createMany([
      { title: 'Test title', price: 1000 },
      { title: 'Test title', price: 2000 },
    ]);
    const books = store.findMany();
    expect(books.length).toEqual(2);
  });

  it('books can be filtered by price', () => {
    const store = new BookMemoryStore();
    store.createMany([
      { title: 'Test title', price: 1000 },
      { title: 'Test title', price: 2000 },
    ]);
    const books = store.findMany({ where: { price: { $gt: 1000 } } });
    expect(books.length).toEqual(1);
  });

  it('book can be filtered by title', () => {
    const store = new BookMemoryStore();
    store.createMany([
      { title: 'A test title', price: 1000 },
      { title: 'Test title', price: 2000 },
    ]);
    const books = store.findMany({
      where: { title: { $in: ['A test title'] } },
    });
    expect(books.length).toEqual(1);
  });

  it('Books are correctly sorted in ascending order', () => {
    const store = new BookMemoryStore();
    store.createMany([
      { title: 'A test title', price: 1000 },
      { title: 'Test title', price: 2000 },
      { title: 'Another Test title', price: 500 },
    ]);
    const books = store.findMany({
      order: { field: 'price', order: 'asc' },
    });
    expect(books[0].price).toEqual(500);
  });

  it('Books are correctly sorted in descending order', () => {
    const store = new BookMemoryStore();
    store.createMany([
      { title: 'A test title', price: 1000 },
      { title: 'Test title', price: 2000 },
      { title: 'Another Test title', price: 500 },
    ]);
    const books = store.findMany({
      order: { field: 'price', order: 'desc' },
    });
    expect(books[0].price).toEqual(2000);
  });
});
