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
exports.bookViewConverter = exports.BookView = void 0;
const models_1 = require("../../../models");
const api_1 = require("../../../api");
const router_1 = require("../../../router");
const book_model_1 = require("../book.model");
class BookView extends models_1.AbstractViewModel {
}
__decorate([
    api_1.viewProp(),
    __metadata("design:type", String)
], BookView.prototype, "title", void 0);
exports.BookView = BookView;
exports.bookViewConverter = router_1.buildViewConverter(book_model_1.Book, BookView);
//# sourceMappingURL=book-view.js.map