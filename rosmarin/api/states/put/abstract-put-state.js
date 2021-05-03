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
exports.AbstractPutState = void 0;
const abstract_state_with_caching_1 = require("../abstract-state-with-caching");
const links_1 = require("../../links");
const relation_types_1 = __importDefault(require("../../relation-types"));
const views_1 = require("../../views");
class AbstractPutState extends abstract_state_with_caching_1.AbstractStateWithCaching {
    constructor() {
        super(...arguments);
        this.responseStatus200 = true;
        this.usingPutToCreateAllowed = false;
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
            this.dbResultAfterGet = yield this.loadModelFromDatabase();
            this.modelInDatabase = this.dbResultAfterGet.result;
            if (this.dbResultAfterGet.isEmpty() &&
                this.usingPutToCreateAllowed === false) {
                return this.response.notFound();
            }
            this.modelForConstraintCheck = this.modelToUpdate;
            if ((yield this.verifyAllStateEntryConstraints()) === false) {
                return this.response.forbidden();
            }
            if (this.clientKnowsCurrentModelState() === false) {
                return this.response.preconditionFailed();
            }
            this.mergeViewModelIntoDatabaseModel();
            this.dbResultAfterUpdate = yield this.updateModelInDatabase();
            if (this.dbResultAfterUpdate.hasError()) {
                return this.response.internalServerError();
            }
            this.modelForConstraintCheck = this.modelInDatabase;
            return yield this.createResponse();
        });
    }
    extractFromRequest() {
        this.modelToUpdate = this.req.body;
        this.updatedId = this.extractFromParams('id');
    }
    clientKnowsCurrentModelState() {
        const currentEtag = this.createEntityTagOfResult(this.dbResultAfterGet.result);
        const lastModifiedAt = this.dbResultAfterGet.result.lastModifiedAt;
        return this.req.evaluateConditionalPutRequest(lastModifiedAt, currentEtag);
    }
    mergeViewModelIntoDatabaseModel() {
        this.modelInDatabase = views_1.merge(this.modelToUpdate, this.modelInDatabase, this.logger);
        this.modelInDatabase.lastModifiedAt = Date.now();
    }
    createResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            this.defineResponseStatus();
            this.defineModelForCaching(this.modelInDatabase);
            this.defineHttpCaching();
            this.defineHttpResponseBody();
            this.defineSelfLink();
            yield this.defineTransitionLinks();
            return this.response;
        });
    }
    defineResponseStatus() {
        this.responseStatus200 ? this.response.ok() : this.response.noContent();
    }
    defineHttpResponseBody() {
        if (this.responseStatus200) {
            this.response.entity = this.convertLinks(this.modelInDatabase);
        }
    }
    defineSelfLink() {
        this.response.link(links_1.linkHeader(this.req.fullUrl(), relation_types_1.default.self, this.getAcceptedMediaType()));
    }
}
exports.AbstractPutState = AbstractPutState;
//# sourceMappingURL=abstract-put-state.js.map