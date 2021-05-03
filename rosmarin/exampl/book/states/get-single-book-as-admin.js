"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSingleBookAsAdmin = void 0;
const get_single_book_1 = require("./get-single-book");
const api_1 = require("../../../api");
let GetSingleBookAsAdmin = class GetSingleBookAsAdmin extends get_single_book_1.GetSingleBook {
    configureState() {
        super.configureState();
        this.activateApiKeyCheck();
    }
    defineTransitionLinks() {
        super.defineTransitionLinks();
        this.addLink('/books/{}', 'updateBook', 'application/vnd.book+json', [
            this.requestedId,
        ]);
        this.addLink('/books/{}', 'deleteBook', [this.requestedId]);
    }
};
GetSingleBookAsAdmin = __decorate([
    api_1.State()
], GetSingleBookAsAdmin);
exports.GetSingleBookAsAdmin = GetSingleBookAsAdmin;
//# sourceMappingURL=get-single-book-as-admin.js.map