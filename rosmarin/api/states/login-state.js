"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginState = void 0;
const abstract_state_with_caching_1 = require("./abstract-state-with-caching");
const caching_1 = require("../caching");
class LoginState extends abstract_state_with_caching_1.AbstractStateWithCaching {
    constructor() {
        super();
    }
    buildInternal() {
        return __awaiter(this, void 0, void 0, function* () {
            this.configureState();
            this.extractFromRequest();
            if ((yield this.verifyApiKey()) === false) {
                return this.response.unauthorized('API key required.');
            }
            if ((yield this.verifyRolesOfClient()) === false) {
                return this.response.forbidden('You have no power here!');
            }
            if ((yield this.verifyAllStateEntryConstraints()) === false) {
                return this.response.forbidden('You have no power here!');
            }
            return yield this.createResponse();
        });
    }
    createResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            this.defineHttpCaching();
            yield this.defineTransitionLinks();
            this.defineAuthenticationResponseHeaders();
            return this.response.ok();
        });
    }
    defineTransitionLinks() {
        this.addLink('/users/{}', 'self', 'application/json', [
            this.authenticationInfo.userModel.id,
        ]);
    }
    extractFromRequest() { }
    configureState() {
        this.activateUserAuthentication();
        this.setHttpCachingType(caching_1.CachingType.DEACTIVATE_CACHE);
    }
}
exports.LoginState = LoginState;
//# sourceMappingURL=login-state.js.map