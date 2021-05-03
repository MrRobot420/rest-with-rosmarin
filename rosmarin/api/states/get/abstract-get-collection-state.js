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
exports.AbstractGetCollectionState = void 0;
const abstract_state_1 = require("../abstract-state");
const caching_1 = require("../../caching");
class AbstractGetCollectionState extends abstract_state_1.AbstractState {
    buildInternal() {
        return __awaiter(this, void 0, void 0, function* () {
            this.configureState();
            this.extractFromRequest();
            this.logger.debug('Start of processing collection state');
            if ((yield this.verifyApiKey()) === false) {
                return this.response.apiKeyRequired();
            }
            if ((yield this.verifyRolesOfClient()) === false) {
                return this.response.unauthorized();
            }
            this.databaseResult = yield this.loadModelsFromDatabase();
            if (this.databaseResult.hasError()) {
                return this.response.internalServerError();
            }
            if ((yield this.verifyAllStateEntryConstraints()) === false) {
                return this.response.forbidden();
            }
            return yield this.createResponse();
        });
    }
    createResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            this.defineHttpHeaderTotalNumberOfResults();
            this.defineHttpHeaderNumberOfResults();
            this.defineHttpResponseBody();
            this.defineHttpCaching();
            this.pagingBehaviour = this.definePagingBehaviour();
            this.definePagingLinks();
            this.defineTransitionLinks();
            this.defineAuthenticationResponseHeaders();
            return this.response;
        });
    }
    defineHttpHeaderTotalNumberOfResults() {
        this.response.header(this.getHeaderForTotalNumberOfResults(), this.databaseResult.totalNumberOfResult);
    }
    defineHttpHeaderNumberOfResults() {
        this.response.header(this.getHeaderForNumberOfResults(), this.databaseResult.databaseResult.length);
    }
    defineHttpResponseBody() {
        this.response.entity = this.convertLinks(this.databaseResult.databaseResult);
    }
    defineHttpCaching() {
        const cacheControl = new caching_1.CacheControl();
        cacheControl.noStore = true;
        cacheControl.noCache = true;
        this.response.cacheControl(cacheControl);
    }
    extractFromRequest() { }
    definePagingLinks() {
        this.pagingBehaviour.build(this.response);
    }
    /**
     * Override this method to change the header name value
     */
    getHeaderForTotalNumberOfResults() {
        return AbstractGetCollectionState.HEADER_TOTALNUMBEROFRESULTS;
    }
    /**
     * Override this method to change the header name value
     */
    getHeaderForNumberOfResults() {
        return AbstractGetCollectionState.HEADER_NUMBEROFRESULTS;
    }
}
exports.AbstractGetCollectionState = AbstractGetCollectionState;
AbstractGetCollectionState.HEADER_TOTALNUMBEROFRESULTS = 'X-totalnumberofresults';
AbstractGetCollectionState.HEADER_NUMBEROFRESULTS = 'X-numberofresults';
//# sourceMappingURL=abstract-get-collection-state.js.map