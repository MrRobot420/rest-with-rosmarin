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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var BookRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const book_model_1 = require("./book.model");
const nanoid_1 = require("nanoid");
const FileSync_js_1 = __importDefault(require("lowdb/adapters/FileSync.js"));
const main_1 = __importDefault(require("lowdb/lib/main"));
const tsyringe_1 = require("tsyringe");
const database_1 = require("../../database");
const bookInDbToBook = (bookInDb) => {
    const book = new book_model_1.Book();
    book.id = bookInDb.id;
    book.description = bookInDb.description;
    book.title = bookInDb.title;
    book.lastModifiedAt = bookInDb.lastModifiedAt;
    return book;
};
let BookRepository = BookRepository_1 = class BookRepository {
    constructor() {
        const adapter = new FileSync_js_1.default('db.json');
        this.db = main_1.default(adapter);
    }
    static generateId() {
        return nanoid_1.nanoid(10);
    }
    static page(array, offset, size) {
        return array.slice(offset, offset + size);
    }
    create(book) {
        return __awaiter(this, void 0, void 0, function* () {
            book.id = BookRepository_1.generateId();
            this.db
                .get('books')
                .push({
                id: book.id,
                title: book.title,
                lastModifiedAt: book.lastModifiedAt,
                description: book.description,
            })
                .write();
            return new database_1.NoContentDatabaseResult();
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookInDb = this.db
                .get('books')
                .find((book) => book.id === id)
                .value();
            if (typeof bookInDb === 'undefined')
                return new database_1.SingleModelDatabaseResult();
            const book = bookInDbToBook(bookInDb);
            return new database_1.SingleModelDatabaseResult(book);
        });
    }
    readAll(title, offset, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = this.db
                .get('books')
                .filter((book) => book.title.includes(title))
                .sortBy('lastModifiedAt')
                .value();
            const totalCount = books.length;
            const result = new database_1.CollectionModelDatabaseResult(BookRepository_1.page(books, offset, size).map(bookInDbToBook));
            result.totalNumberOfResult = totalCount;
            return result;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.get('books').remove({ id }).write();
        });
    }
    update(book) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.db.get('books').find({ id: book.id }).assign({
                title: book.title,
                lastModifiedAt: book.lastModifiedAt,
                description: book.description,
            });
        });
    }
};
BookRepository = BookRepository_1 = __decorate([
    tsyringe_1.singleton(),
    __metadata("design:paramtypes", [])
], BookRepository);
exports.BookRepository = BookRepository;
//# sourceMappingURL=book.repository.js.map