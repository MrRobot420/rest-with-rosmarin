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
exports.AbstractGetState = void 0;
const abstract_state_with_caching_1 = require("../abstract-state-with-caching");
const links_1 = require("../../links");
const relation_types_1 = __importDefault(require("../../relation-types"));
class AbstractGetState extends abstract_state_with_caching_1.AbstractStateWithCaching {
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
                return this.response.forbidden('You have no power here!'); // TODO: 401 vs 403?
            }
            this.requestedModel = yield this.loadModelFromDatabase();
            if (this.requestedModel.hasError()) {
                return this.response.internalServerError();
            }
            if (this.requestedModel.isEmpty()) {
                // TODO provide user the possibility to throw custom error
                return this.response.notFound('This resource does not exist.');
            }
            this.modelForConstraintCheck = this.requestedModel.result;
            if ((yield this.verifyAllStateEntryConstraints()) === false) {
                return this.response.forbidden('You have no power here!');
            }
            if (this.clientKnowsCurrentModelState()) {
                return this.response.notModified();
                // TODO: set headers
                // TODO: Question: Should links be sent too?
            }
            this.modelForCaching = this.requestedModel.result; // TODO: ???
            return yield this.createResponse();
        });
    }
    createResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.defineHttpResponseBody()
            this.defineModelForCaching(this.requestedModel.result);
            this.defineHttpCaching();
            this.defineHttpResponseBody(); // We had to change the order here, because the etag value was affected by the generated links
            // this.defineHttpCaching()
            this.defineSelfLink();
            yield this.defineTransitionLinks();
            this.defineAuthenticationResponseHeaders();
            return this.response.ok();
        });
    }
    defineHttpResponseBody() {
        this.response.entity = this.convertLinks(this.requestedModel.result);
    }
    extractFromRequest() {
        this.requestedId = this.extractFromParams('id');
    }
    clientKnowsCurrentModelState() {
        const currentEtag = this.createEntityTagOfResult(this.requestedModel.result);
        return this.req.evaluateConditionalGetRequest(this.requestedModel.result.lastModifiedAt, currentEtag);
    }
    defineSelfLink() {
        this.response.link(links_1.linkHeader(this.req.fullUrl(), relation_types_1.default.self, this.getAcceptedMediaType()));
    }
}
exports.AbstractGetState = AbstractGetState;
//# sourceMappingURL=abstract-get-state.js.map