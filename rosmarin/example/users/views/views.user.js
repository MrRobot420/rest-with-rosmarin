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
exports.userViewConverter = exports.UserView = void 0;
const models_1 = require("../../../models");
const api_1 = require("../../../api");
const router_1 = require("../../../router");
const users_model_1 = require("../users.model");
class UserView extends models_1.AbstractViewModel {
}
__decorate([
    api_1.viewProp(),
    __metadata("design:type", String)
], UserView.prototype, "principal", void 0);
__decorate([
    api_1.viewArrayProp(() => String),
    __metadata("design:type", Array)
], UserView.prototype, "roles", void 0);
exports.UserView = UserView;
exports.userViewConverter = router_1.buildViewConverter(users_model_1.User, UserView);
//# sourceMappingURL=views.user.js.map