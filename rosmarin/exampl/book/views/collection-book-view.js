"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionBookViewConverter = exports.CollectionBookView = void 0;
const book_view_1 = require("./book-view");
const api_1 = require("../../../api");
const router_1 = require("../../../router");
const book_model_1 = require("../book.model");
let CollectionBookView = class CollectionBookView extends book_view_1.BookView {
};
CollectionBookView = __decorate([
    api_1.collectionView()
], CollectionBookView);
exports.CollectionBookView = CollectionBookView;
exports.collectionBookViewConverter = router_1.buildViewConverter(book_model_1.Book, CollectionBookView);
//# sourceMappingURL=collection-book-view.js.map