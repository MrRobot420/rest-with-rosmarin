"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = exports.statement = void 0;
const database_1 = require("../../database");
const books_model_1 = require("./books.model");
const abstract_repository_1 = require("../../database/repositories/abstract-repository");
const postgres_data_source_1 = require("../../database/data-sources/postgres/postgres-data-source");
const tsyringe_1 = require("tsyringe");
exports.statement = `
CREATE TABLE "BOOK"(
    "bookId" SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    lastModifiedAt bigint NOT NULL,
    published bigint NOT NULL
);
`;
let BooksRepository = class BooksRepository extends abstract_repository_1.AbstractRepository {
    constructor(postgres) {
        super();
        this.postgres = postgres;
    }
    create(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
          INSERT INTO "BOOK"(title, lastmodifiedat, published)
          VALUES ($1, $2, $3)
          RETURNING "bookId"
      `;
                const queryResult = yield this.postgres.query(query, book.title, book.lastModifiedAt, book.published);
                book.id = queryResult.rows[0].bookId;
                return new database_1.NoContentDatabaseResult();
            }
            catch (e) {
                const result = new database_1.NoContentDatabaseResult();
                result.setError(100, e.message);
                return result;
            }
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
          SELECT * 
          FROM "BOOK"
          WHERE "bookId" = $1
      `;
                const queryResult = yield this.postgres.query(query, id);
                if (queryResult.rows.length === 0) {
                    return new database_1.SingleModelDatabaseResult();
                }
                const book = new books_model_1.Book();
                book.id = queryResult.rows[0].bookId;
                book.title = queryResult.rows[0].title;
                book.published = queryResult.rows[0].published;
                book.lastModifiedAt = queryResult.rows[0].lastmodifiedat;
                return new database_1.SingleModelDatabaseResult(book);
            }
            catch (e) {
                const result = new database_1.SingleModelDatabaseResult();
                result.setError(100, e.message);
                return result;
            }
        });
    }
    readBooksByTitle(title, offset, size) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
          SELECT *, count(*) OVER() AS full_count
          FROM   "BOOK"
          WHERE title LIKE $1
          ORDER  BY lastmodifiedat
          OFFSET $2
          LIMIT  $3
      `;
                const queryResult = yield this.postgres.query(query, `%${title}%`, offset, size);
                if (queryResult.rows.length === 0) {
                    return new database_1.CollectionModelDatabaseResult();
                }
                const books = queryResult.rows.map((book) => {
                    const newBook = new books_model_1.Book();
                    newBook.id = book.bookId;
                    newBook.title = book.title;
                    newBook.published = book.published;
                    newBook.lastModifiedAt = book.lastmodifiedat;
                    return newBook;
                });
                const result = new database_1.CollectionModelDatabaseResult(books);
                result.totalNumberOfResult = queryResult.rows[0].full_count;
                return result;
            }
            catch (e) {
                const result = new database_1.CollectionModelDatabaseResult();
                result.setError(100, e.message);
                return result;
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
         DELETE FROM "BOOK"
         WHERE "bookId" = $1
      `;
                yield this.postgres.query(query, id);
                return new database_1.NoContentDatabaseResult();
            }
            catch (e) {
                const result = new database_1.NoContentDatabaseResult();
                result.setError(100, e.message);
                return result;
            }
        });
    }
    updateBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
         UPDATE "BOOK"
         SET "title" = $1,
             "lastmodifiedat" = $2
         WHERE "bookId" = $3
      `;
                yield this.postgres.query(query, book.title, book.lastModifiedAt, book.id);
                return new database_1.NoContentDatabaseResult();
            }
            catch (e) {
                const result = new database_1.NoContentDatabaseResult();
                result.setError(100, e.message);
                return result;
            }
        });
    }
};
BooksRepository = __decorate([
    tsyringe_1.singleton(),
    __metadata("design:paramtypes", [postgres_data_source_1.PostgresDataSource])
], BooksRepository);
exports.BooksRepository = BooksRepository;
//# sourceMappingURL=books.repository.js.map