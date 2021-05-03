"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookCollectionViewConverter = exports.BookCollectionView = void 0;
const api_1 = require("../../../api");
const views_book_1 = require("./views.book");
const router_1 = require("../../../router");
const books_model_1 = require("../books.model");
let BookCollectionView = class BookCollectionView extends views_book_1.BookView {
};
BookCollectionView = __decorate([
    api_1.collectionView()
], BookCollectionView);
exports.BookCollectionView = BookCollectionView;
exports.bookCollectionViewConverter = router_1.buildViewConverter(books_model_1.Book, BookCollectionView);
//# sourceMappingURL=views.books.js.map