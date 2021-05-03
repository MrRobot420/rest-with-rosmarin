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
exports.AbstractDeleteState = void 0;
const abstract_state_1 = require("../abstract-state");
const caching_1 = require("../../caching");
class AbstractDeleteState extends abstract_state_1.AbstractState {
    constructor() {
        super(...arguments);
        this.responseStatus200 = false;
    }
    buildInternal() {
        return __awaiter(this, void 0, void 0, function* () {
            this.configureState();
            this.extractFromRequest();
            if ((yield this.verifyApiKey()) === false) {
                return this.response.unauthorized('API key required.');
            }
            if ((yield this.verifyRolesOfClient()) === false) {
                return this.response.unauthorized('You have no power here!');
            }
            // locking
            this.dbResultAfterGet = yield this.loadModelFromDatabase();
            if (this.dbResultAfterGet.isEmpty()) {
                return this.response.notFound();
            }
            this.modelForConstraintCheck = this.dbResultAfterGet.result;
            if ((yield this.verifyAllStateEntryConstraints()) === false) {
                return this.response.forbidden();
            }
            if (this.clientKnowsCurrentModelState() === false) {
                return this.response.preconditionFailed();
            }
            this.dbResultAfterDelete = yield this.deleteModelInDatabase();
            if (this.dbResultAfterDelete.hasError()) {
                return this.response.internalServerError();
            }
            return this.createResponse();
        });
    }
    clientKnowsCurrentModelState() {
        const currentEtag = this.createEntityTagOfResult();
        const lastModifiedAt = this.dbResultAfterGet.result.lastModifiedAt;
        return this.req.evaluateConditionalPutRequest(lastModifiedAt, currentEtag);
    }
    createEntityTagOfResult() {
        return caching_1.createEtag(this.dbResultAfterGet.result);
    }
    createResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            this.defineResponseStatus();
            this.defineHttpResponseBody();
            yield this.defineTransitionLinks();
            return this.response;
        });
    }
    defineResponseStatus() {
        this.responseStatus200 ? this.response.ok() : this.response.noContent();
    }
    defineHttpResponseBody() {
        if (this.responseStatus200) {
            this.response.entity = this.convertLinks(this.dbResultAfterGet.result);
        }
    }
    extractFromRequest() {
        this.modelIdToDelete = this.extractFromParams('id');
    }
}
exports.AbstractDeleteState = AbstractDeleteState;
//# sourceMappingURL=abstract-delete-state.js.map