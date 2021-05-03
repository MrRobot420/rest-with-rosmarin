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
exports.PerformanceController = void 0;
const router_1 = require("../../router");
const books_types_1 = require("../books/books.types");
const http_response_1 = require("../../router/http-response");
const empty_model_1 = require("../../models/empty-model");
const performance_state_1 = require("./performance.state");
let PerformanceController = class PerformanceController {
    getSingleBook(req, res) {
        return new performance_state_1.GetPerformance().configure(req, res);
    }
};
__decorate([
    router_1.Get({
        produces: books_types_1.bookTypes.BOOK,
        viewConverter: router_1.buildViewConverter(empty_model_1.EmptyModel, empty_model_1.EmptyModel),
        path: '/',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], PerformanceController.prototype, "getSingleBook", null);
PerformanceController = __decorate([
    router_1.Controller('/performance')
], PerformanceController);
exports.PerformanceController = PerformanceController;
//# sourceMappingURL=performance.controller.js.map