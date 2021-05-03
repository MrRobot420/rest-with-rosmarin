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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractState = void 0;
const tsyringe_1 = require("tsyringe");
const security_1 = require("../security");
const api_key_1 = require("../api-key");
const links_1 = require("../links");
const constants_1 = __importDefault(require("../../constants"));
const http_error_1 = require("../../router/errors/http-error");
class AbstractState {
    constructor() {
        this.apiKeyVerificationActivated = false;
        this.userAuthenticationActivated = false;
        this.stateEntryConstraints = [];
        this.allowedRoles = new security_1.Roles();
        this.logger = tsyringe_1.container
            .resolve(constants_1.default.LOGGER)
            .child({ state: this.constructor.name });
        this.authenticationInfoProvider = tsyringe_1.container.resolve(constants_1.default.AUTHENTICATION_INFO_PROVIDER);
        this.apiKeyInfoProvider = tsyringe_1.container.resolve(constants_1.default.API_KEY_INFO_PROVIDER);
    }
    configure(req, response) {
        this.req = req;
        this.response = response;
        return { state: this };
    }
    addStateEntryConstraint(constraint) {
        this.stateEntryConstraints.push(constraint);
    }
    verifyAllStateEntryConstraints() {
        return __awaiter(this, void 0, void 0, function* () {
            const promisedConstraints = this.stateEntryConstraints.map((constraint) => constraint.call(this));
            return (yield Promise.all(promisedConstraints)).every(Boolean);
        });
    }
    verifyRolesOfClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userAuthenticationActivated) {
                const auth = yield this.authorizeUser(new security_1.AuthenticationHeader(this.req));
                this.logger.debug(`Authentication activated. User is authorized: ${auth}.`);
                return auth;
            }
            else {
                this.logger.debug(`Authentication NOT activated..`);
                return true;
            }
        });
    }
    activateUserAuthentication() {
        this.userAuthenticationActivated = true;
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.req === 'undefined' ||
                typeof this.response === 'undefined') {
                this.logger.error('Please configure the state before you call the build() method.');
            }
            yield this.buildInternal();
        });
    }
    verifyApiKey() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.apiKeyVerificationActivated) {
                return yield this.verifyNecessaryApiKey();
            }
            else {
                return true;
            }
        });
    }
    authorizeUser(authenticationHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authenticationHeader.isSet()) {
                return yield this.isAccessAllowedForThisUser(authenticationHeader);
            }
            else {
                return this.isAccessWithoutAuthenticationAllowed();
            }
        });
    }
    isAccessWithoutAuthenticationAllowed() {
        return this.allowedRoles.matchesWithoutAuthentication();
    }
    isAccessAllowedForThisUser(authenticationHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            this.authenticationInfo = yield this.authenticationInfoProvider.get(authenticationHeader);
            if (this.authenticationInfo === undefined ||
                this.authenticationInfo.isAuthenticated === false) {
                return false;
            }
            else {
                return this.authenticationInfo.hasRoles(this.allowedRoles);
            }
        });
    }
    activateApiKeyCheck() {
        this.apiKeyVerificationActivated = true;
    }
    configureState() { }
    extractFrom(from, key, transformTo, defaultValue, options = {}) {
        var _a;
        let value = this.req[from][key];
        if (typeof value === 'undefined' && options.throwIfUndefined === true) {
            throw new http_error_1.HttpError(400, 'Bad Request', `Value of '${key}' in request ${from} cannot be undefined.`);
        }
        if (typeof options.validate === 'function') {
            options.validate(value);
        }
        switch (transformTo) {
            case 'string':
                break;
            case 'boolean': {
                value = value == 'true';
                break;
            }
            case 'number': {
                value = +value;
                if (isNaN(value)) {
                    value = defaultValue;
                }
                break;
            }
        }
        return (_a = value) !== null && _a !== void 0 ? _a : defaultValue;
    }
    extractNumberFromQuery(key, defaultValue, options = {}) {
        return this.extractFrom('query', key, 'number', defaultValue, options);
    }
    extractBoolFromQuery(key, defaultValue, options = {}) {
        return this.extractFrom('query', key, 'boolean', defaultValue, options);
    }
    extractFromQuery(key, defaultValue, options = {}) {
        return this.extractFrom('query', key, 'string', defaultValue, options);
    }
    extractNumberFromParams(key, defaultValue, options = {}) {
        return this.extractFrom('params', key, 'number', defaultValue, options);
    }
    extractBoolFromParams(key, defaultValue, options = {}) {
        return this.extractFrom('params', key, 'boolean', defaultValue, options);
    }
    extractFromParams(key, defaultValue, options = {}) {
        return this.extractFrom('params', key, 'string', defaultValue, options);
    }
    extractNumberFromHeaders(key, defaultValue, options = {}) {
        return this.extractFrom('headers', key, 'number', defaultValue, options);
    }
    extractBoolFromHeaders(key, defaultValue, options = {}) {
        return this.extractFrom('headers', key, 'boolean', defaultValue, options);
    }
    extractFromHeaders(key, defaultValue, options = {}) {
        return this.extractFrom('headers', key, 'string', defaultValue, options);
    }
    defineAuthenticationResponseHeaders() {
        if (this.authenticationInfo !== undefined &&
            this.authenticationInfo.isAuthenticated) {
            if (this.authenticationInfo.tokenToRespond !== undefined) {
                const respond = this
                    .authenticationInfo.tokenToRespond;
                this.response.header(respond.tokenHeaderName, respond.token);
            }
        }
    }
    getApiKeInfo(apiKey) {
        return this.apiKeyInfoProvider.get(apiKey);
    }
    addConstrainedLink(constraint, uriTemplate, relType, mediaTypeOrParams = [], params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield constraint.call(this)) === true) {
                this.response.link(links_1.buildLink(this.req.baseUrl() + uriTemplate, relType, mediaTypeOrParams, params));
            }
        });
    }
    addLink(uriTemplate, relType, mediaTypeOrParams = [], params = []) {
        this.response.link(links_1.buildLink(this.req.baseUrl() + uriTemplate, relType, mediaTypeOrParams, params));
    }
    getMediaTypeFromContentTypeHeader() {
        return this.req.headers['content-type'];
    }
    getAcceptedMediaType() {
        return this.req.acceptedMediaType;
    }
    verifyNecessaryApiKey() {
        return __awaiter(this, void 0, void 0, function* () {
            this.apiKeyHeader = new api_key_1.ApiKeyHeader(this.req);
            const apiKeyInfo = yield this.getApiKeInfo(this.apiKeyHeader);
            return apiKeyInfo.isValid();
        });
    }
    convertLinks(models) {
        return links_1.convertLinks(models, this.req.baseUrl());
    }
}
exports.AbstractState = AbstractState;
//# sourceMappingURL=abstract-state.js.map