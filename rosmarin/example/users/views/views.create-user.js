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
exports.createUserView = exports.CreateUserView = void 0;
const models_1 = require("../../../models");
const api_1 = require("../../../api");
const router_1 = require("../../../router");
class CreateUserView extends models_1.AbstractViewModel {
}
__decorate([
    api_1.viewProp(),
    __metadata("design:type", String)
], CreateUserView.prototype, "principal", void 0);
__decorate([
    api_1.viewProp(),
    __metadata("design:type", String)
], CreateUserView.prototype, "password", void 0);
__decorate([
    api_1.viewArrayProp(() => String),
    __metadata("design:type", Array)
], CreateUserView.prototype, "roles", void 0);
exports.CreateUserView = CreateUserView;
exports.createUserView = router_1.buildValidatorAndTransformer(CreateUserView);
//# sourceMappingURL=views.create-user.js.map