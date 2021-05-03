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
exports.UsersController = void 0;
const router_1 = require("../../router");
const http_response_1 = require("../../router/http-response");
const views_create_user_1 = require("./views/views.create-user");
const states_post_user_1 = require("./states/states.post-user");
const states_get_single_user_1 = require("./states/states.get-single-user");
const views_user_1 = require("./views/views.user");
let UsersController = class UsersController {
    postUser(req, res) {
        return new states_post_user_1.PostUser().configure(req, res);
    }
    getSingleUser(req, res) {
        return new states_get_single_user_1.GetSingleUser().configure(req, res);
    }
};
__decorate([
    router_1.Post({
        consumes: 'application/vnd.user+json',
        schema: {
            body: views_create_user_1.createUserView,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "postUser", null);
__decorate([
    router_1.Get({
        produces: 'application/vnd.user+json',
        viewConverter: views_user_1.userViewConverter,
        path: '/:id',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, http_response_1.HttpResponse]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getSingleUser", null);
UsersController = __decorate([
    router_1.Controller('/users')
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map