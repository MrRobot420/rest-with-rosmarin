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
exports.PostUser = void 0;
const api_1 = require("../../../api");
const users_model_1 = require("../users.model");
const users_repository_1 = require("../users.repository");
let PostUser = class PostUser extends api_1.AbstractPostState {
    constructor(userRepository) {
        super();
        this.userRepository = userRepository;
    }
    createDatabaseModel() {
        const user = new users_model_1.User();
        user.lastModifiedAt = Date.now();
        return user;
    }
    createModelInDatabase() {
        return this.userRepository.create(this.modelToStoreInDatabase);
    }
    defineTransitionLinks() {
        return undefined;
    }
};
PostUser = __decorate([
    api_1.State(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], PostUser);
exports.PostUser = PostUser;
//# sourceMappingURL=states.post-user.js.map