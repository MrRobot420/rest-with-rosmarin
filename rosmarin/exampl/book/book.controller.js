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
exports.BookController = void 0;
const router_1 = require("../../router");
const create_book_view_1 = require("./views/create-book-view");
const post_book_1 = require("./states/post-book");
const http_response_1 = require("../../router/http-response");
const get_single_book_1 = require("./states/get-single-book");
const book_view_1 = require("./views/book-view");
const get_single_book_as_admin_1 = require("./states/get-single-book-as-admin");
const admin_book_view_1 = require("./views/admin-book-view");
const get_book_collection_1 = require("./states/get-book-collection");
const collection_book_view_1 = require("./views/collection-book-view");
let BookController = class BookController {
    postBook(req, res) {
        return new post_book_1.PostBook().configure(req, res);
    }
    getSingleBook(req, res) {
        return new get_single_book_1.GetSingleBook().configure(req, res);
    }
    getSingleBookAdmin(req, res) {
        return new get_single_book_as_admin_1.GetSingleBookAsAdmin().configure(req, res);
    }
    getAllBooks(req, res) {
        return new get_book_collection_1.GetBookCollection().configure(req, res);
    }
};
__decorate([
    router_1.Post({
        consumes: 'application/vnd.book+json',
        schema: {
            body: create_book_view_1.createBookViewSchema,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BookController.prototype, "postBook", null);
__decorate([
    router_1.Get({
        produces: 'application/vnd.book+json',
        viewConverter: book_view_1.bookViewConverter,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BookController.prototype, "getSingleBook", null);
__decorate([
    router_1.Get({
        produces: 'application/vnd.book-admin+json',
        viewConverter: admin_book_view_1.bookViewConverterForAdmin,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BookController.prototype, "getSingleBookAdmin", null);
__decorate([
    router_1.GetCollection({
        produces: 'application/vnd.book+json',
        viewConverter: collection_book_view_1.collectionBookViewConverter,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], BookController.prototype, "getAllBooks", null);
BookController = __decorate([
    router_1.Controller('/books')
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map