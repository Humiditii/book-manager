# Book Manager
This program provides a few endpoints to manage a conceptual book.

The important bit is around the book storage and retrieval, I implemented a tiny storage ORM as an access interface
to an in-memory resource, with a hashtable-based indexing.

Live link - https://book-manager-3vbu.onrender.com/

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The Swagger doc is in `{{server_url}}/docs`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


