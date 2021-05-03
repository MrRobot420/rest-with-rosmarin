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
exports.GetBookCollection = void 0;
const api_1 = require("../../../api");
const book_repository_1 = require("../book.repository");
let GetBookCollection = class GetBookCollection extends api_1.AbstractGetCollectionStateWithOffsetSizePaging {
    constructor(bookRepository) {
        super();
        this.bookRepository = bookRepository;
    }
    defineTransitionLinks() { }
    loadModelsFromDatabase() {
        return this.bookRepository.readAll(this.title, this.offset, this.size);
    }
    extractFromRequest() {
        super.extractFromRequest();
        this.title = this.extractFromQuery('title', '', { throwIfUndefined: true });
    }
};
GetBookCollection = __decorate([
    api_1.State(),
    __metadata("design:paramtypes", [book_repository_1.BookRepository])
], GetBookCollection);
exports.GetBookCollection = GetBookCollection;
//# sourceMappingURL=get-book-collection.js.map