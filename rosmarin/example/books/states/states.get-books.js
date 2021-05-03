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
exports.GetBooks = void 0;
const api_1 = require("../../../api");
const books_repository_1 = require("../books.repository");
let GetBooks = class GetBooks extends api_1.AbstractGetCollectionStateWithOffsetSizePaging {
    constructor(bookRepository) {
        super();
        this.bookRepository = bookRepository;
    }
    defineTransitionLinks() {
        return undefined;
    }
    loadModelsFromDatabase() {
        return this.bookRepository.readBooksByTitle(this.searchForTitle, this.offset, this.size);
    }
    extractFromRequest() {
        super.extractFromRequest();
        this.searchForTitle = this.extractFromQuery('title', '', {
            throwIfUndefined: true,
        });
    }
};
GetBooks = __decorate([
    api_1.State(),
    __metadata("design:paramtypes", [books_repository_1.BooksRepository])
], GetBooks);
exports.GetBooks = GetBooks;
//# sourceMappingURL=states.get-books.js.map