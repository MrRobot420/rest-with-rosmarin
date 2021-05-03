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
exports.UpdateBook = void 0;
const api_1 = require("../../../api");
const books_repository_1 = require("../books.repository");
let UpdateBook = class UpdateBook extends api_1.AbstractPutState {
    constructor(bookRepository) {
        super();
        this.bookRepository = bookRepository;
    }
    defineTransitionLinks() { }
    loadModelFromDatabase() {
        return this.bookRepository.readById(this.updatedId);
    }
    updateModelInDatabase() {
        return this.bookRepository.updateBook(this.modelInDatabase);
    }
    configureState() {
        this.setHttpCachingType(api_1.CachingType.VALIDATION_ETAG, api_1.CacheControlConfiguration.NO_CACHE);
    }
};
UpdateBook = __decorate([
    api_1.State(),
    __metadata("design:paramtypes", [books_repository_1.BooksRepository])
], UpdateBook);
exports.UpdateBook = UpdateBook;
//# sourceMappingURL=states.update-book.js.map