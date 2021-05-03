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
exports.AbstractUserModel = void 0;
const abstract_model_1 = require("./abstract-model");
const api_1 = require("../api");
class AbstractUserModel extends abstract_model_1.AbstractModel {
}
__decorate([
    api_1.modelProp(),
    __metadata("design:type", String)
], AbstractUserModel.prototype, "principal", void 0);
__decorate([
    api_1.modelProp(),
    __metadata("design:type", String)
], AbstractUserModel.prototype, "password", void 0);
__decorate([
    api_1.modelArrayProp(() => String),
    __metadata("design:type", Array)
], AbstractUserModel.prototype, "roles", void 0);
exports.AbstractUserModel = AbstractUserModel;
//# sourceMappingURL=abstract-user-model.js.map