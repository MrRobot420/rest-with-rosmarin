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
exports.BooksController = void 0;
const router_1 = require("../../router");
const http_response_1 = require("../../router/http-response");
const states_post_book_1 = require("./states/states.post-book");
const books_types_1 = require("./books.types");
const views_create_book_1 = require("./views/views.create-book");
const states_get_single_book_1 = require("./states/states.get-single-book");
const views_book_1 = require("./views/views.book");
const views_book_without_published_1 = require("./views/views.book-without-published");
const states_get_books_1 = require("./states/states.get-books");
const views_books_1 = require("./views/views.books");
const states_delete_book_1 = require("./states/states.delete-book");
const views_update_book_1 = require("./views/views.update-book");
const states_update_book_1 = require("./states/states.update-book");
let BooksController = class BooksController {
    postBook(req, res) {
        return new states_post_book_1.PostBook().configure(req, res);
    }
    getSingleBook(req, res) {
        return new states_get_single_book_1.GetSingleBook().configure(req, res);
    }
    getSingleBookWithoutPublished(req, res) {
        return new states_get_single_book_1.GetSingleBook().configure(req, res);
    }
    getBooks(req, res) {
        return new states_get_books_1.GetBooks().configure(req, res);
    }
    deleteBook(req, res) {
        return new states_delete_book_1.DeleteBook().configure(req, res);
    }
    putBook(req, res) {
        return new states_update_book_1.UpdateBook().configure(req, res);
    }
};
__decorate([
    router_1.Post({
        consumes: books_types_1.bookTypes.BOOK,
        schema: {
            body: views_create_book_1.createBookSchema,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BooksController.prototype, "postBook", null);
__decorate([
    router_1.Get({
        produces: books_types_1.bookTypes.BOOK,
        viewConverter: views_book_1.bookViewConverter,
        path: '/:id',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BooksController.prototype, "getSingleBook", null);
__decorate([
    router_1.Get({
        produces: books_types_1.bookTypes.BOOK_WITHOUT_PUBLISHED,
        viewConverter: views_book_without_published_1.bookWithoutPublishedViewConverter,
        path: '/:id',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BooksController.prototype, "getSingleBookWithoutPublished", null);
__decorate([
    router_1.GetCollection({
        produces: books_types_1.bookTypes.BOOK,
        viewConverter: views_books_1.bookCollectionViewConverter,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BooksController.prototype, "getBooks", null);
__decorate([
    router_1.Delete(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BooksController.prototype, "deleteBook", null);
__decorate([
    router_1.Put({
        consumes: books_types_1.bookTypes.BOOK,
        produces: books_types_1.bookTypes.BOOK,
        schema: {
            body: views_update_book_1.updateBookSchema,
        },
        path: '/:id',
        viewConverter: views_book_1.bookViewConverter,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BooksController.prototype, "putBook", null);
BooksController = __decorate([
    router_1.Controller('/books')
], BooksController);
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map