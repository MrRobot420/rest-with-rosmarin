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
exports.GetSingleBook = void 0;
const api_1 = require("../../../api");
const book_repository_1 = require("../book.repository");
let GetSingleBook = class GetSingleBook extends api_1.AbstractGetState {
    constructor(bookRepository) {
        super();
        this.bookRepository = bookRepository;
    }
    defineTransitionLinks() {
        this.addLink('/books', 'getAllBooks', 'application/vnd.book+json');
    }
    loadModelFromDatabase() {
        return this.bookRepository.readById(this.requestedId.toString());
    }
    configureState() {
        this.setHttpCachingType(api_1.CachingType.VALIDATION_ETAG, api_1.CacheControlConfiguration.PRIVATE);
        this.maxAgeInSeconds = 3600;
    }
};
GetSingleBook = __decorate([
    api_1.State(),
    __metadata("design:paramtypes", [book_repository_1.BookRepository])
], GetSingleBook);
exports.GetSingleBook = GetSingleBook;
//# sourceMappingURL=get-single-book.js.map