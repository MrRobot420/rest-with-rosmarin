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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.JsonWebTokenAuthenticationInfoProvider = void 0;
const authentication_info_1 = require("./authentication-info");
const jsonwebtoken_1 = require("jsonwebtoken");
const database_1 = require("../../database");
const bcrypt_1 = require("bcrypt");
const authentication_info_token_to_respond_1 = require("./authentication-info-token-to-respond");
const http_error_1 = require("../../router/errors/http-error");
const secrets_1 = require("./secrets");
let JsonWebTokenAuthenticationInfoProvider = class JsonWebTokenAuthenticationInfoProvider {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    get(authenticationHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authenticationHeader.isSet() &&
                authenticationHeader.isTokenAuthentication() === false &&
                authenticationHeader.principal &&
                authenticationHeader.credential) {
                const principal = authenticationHeader.principal;
                const credential = authenticationHeader.credential;
                const databaseResult = yield this.userRepository.readByPrincipal(principal);
                if (databaseResult.isEmpty())
                    return authentication_info_1.AuthenticationInfo.NOT_AUTHENTICATED;
                if ((yield bcrypt_1.compare(credential, databaseResult.result.password)) === false) {
                    throw new http_error_1.HttpError(401, 'Unauthorized', 'Invalid password.');
                }
                const jwt = yield jsonwebtoken_1.sign({
                    userId: databaseResult.result.id,
                    roles: databaseResult.result.roles,
                }, secrets_1.jwtSecret, {
                    expiresIn: '1h',
                });
                return authentication_info_1.AuthenticationInfo.withTokenToRespondAndPrincipal(new authentication_info_token_to_respond_1.AuthenticationInfoTokenToRespond('authorization', jwt), principal, databaseResult.result.roles, databaseResult.result);
            }
            else if (authenticationHeader.isTokenAuthentication() &&
                authenticationHeader.isSet()) {
                const jwtToken = authenticationHeader.token;
                try {
                    const decoded = (yield jsonwebtoken_1.verify(jwtToken, secrets_1.jwtSecret));
                    const databaseResult = yield this.userRepository.readById(decoded.id);
                    return new authentication_info_1.AuthenticationInfo(databaseResult.result.principal, '', decoded.roles, databaseResult.result);
                }
                catch (e) {
                    throw new http_error_1.HttpError(401, 'Unauthorized', 'Invalid token.');
                }
            }
            else {
                return authentication_info_1.AuthenticationInfo.NOT_AUTHENTICATED;
            }
        });
    }
};
JsonWebTokenAuthenticationInfoProvider = __decorate([
    __param(0, database_1.injectUserRepository()),
    __metadata("design:paramtypes", [Object])
], JsonWebTokenAuthenticationInfoProvider);
exports.JsonWebTokenAuthenticationInfoProvider = JsonWebTokenAuthenticationInfoProvider;
//# sourceMappingURL=json-web-token-authentication-info-provider.js.map