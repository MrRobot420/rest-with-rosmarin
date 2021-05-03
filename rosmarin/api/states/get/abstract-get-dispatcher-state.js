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
exports.AbstractGetDispatcherState = void 0;
const abstract_state_1 = require("../abstract-state");
const caching_1 = require("../../caching");
const links_1 = require("../../links");
const relation_types_1 = __importDefault(require("../../relation-types"));
class AbstractGetDispatcherState extends abstract_state_1.AbstractState {
    buildInternal() {
        return __awaiter(this, void 0, void 0, function* () {
            this.configureState();
            if ((yield this.verifyApiKey()) === false) {
                return this.response.unauthorized('API key required.');
            }
            return this.createResponse();
        });
    }
    createResponse() {
        this.defineHttpResponseBody();
        this.defineHttpCaching();
        this.defineSelfLink();
        this.defineTransitionLinks();
        this.defineAuthenticationResponseHeaders();
        return this.response.ok();
    }
    defineHttpCachingByCacheControl() {
        const cacheControl = new caching_1.CacheControl();
        cacheControl.noCache = true;
        cacheControl.noStore = true;
        this.response.cacheControl(cacheControl);
    }
    defineHttpResponseBody() {
        return undefined;
    }
    defineHttpCaching() {
        this.defineHttpCachingByCacheControl();
    }
    defineSelfLink() {
        this.response.link(links_1.linkHeader(this.req.fullUrl(), relation_types_1.default.self, this.getAcceptedMediaType()));
    }
}
exports.AbstractGetDispatcherState = AbstractGetDispatcherState;
//# sourceMappingURL=abstract-get-dispatcher-state.js.map