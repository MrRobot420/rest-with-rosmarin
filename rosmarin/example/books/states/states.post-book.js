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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostBook = void 0;
const api_1 = require("../../../api");
const books_model_1 = require("../books.model");
const books_repository_1 = require("../books.repository");
const books_types_1 = require("../books.types");
let PostBook = class PostBook extends api_1.AbstractPostState {
    constructor(bookRepository) {
        super();
        this.bookRepository = bookRepository;
    }
    createDatabaseModel() {
        const book = new books_model_1.Book();
        book.published = Date.now();
        return book;
    }
    createModelInDatabase() {
        return this.bookRepository.create(this.modelToStoreInDatabase);
    }
    defineTransitionLinks() {
        this.addLink('/books', 'getAllBooks', books_types_1.bookTypes.BOOK);
    }
};
PostBook = __decorate([
    api_1.State(),
    __metadata("design:paramtypes", [books_repository_1.BooksRepository])
], PostBook);
exports.PostBook = PostBook;
//# sourceMappingURL=states.post-book.js.map