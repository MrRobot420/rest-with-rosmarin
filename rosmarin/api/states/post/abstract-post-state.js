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
exports.AbstractPostState = void 0;
const abstract_state_1 = require("../abstract-state");
const views_1 = require("../../views");
class AbstractPostState extends abstract_state_1.AbstractState {
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
            this.modelForConstraintCheck = this.modelToCreate;
            if ((yield this.verifyAllStateEntryConstraints()) === false) {
                return this.response.forbidden('Forbidden');
            }
            this.mergeViewModelToDatabaseModel();
            this.dbResultAfterSave = yield this.createModelInDatabase();
            if (this.dbResultAfterSave.hasError()) {
                return this.response.internalServerError();
            }
            return yield this.createResponse();
        });
    }
    createResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            this.defineLocationLink();
            yield this.defineTransitionLinks();
            return this.response;
        });
    }
    extractFromRequest() {
        this.modelToCreate = this.req.body;
    }
    defineLocationLink() {
        const locationLink = this.req.fullUrl() + '/' + this.modelToStoreInDatabase.id;
        this.response.location(locationLink);
        this.response.created();
    }
    mergeViewModelToDatabaseModel() {
        this.modelToStoreInDatabase = this.createDatabaseModel();
        this.modelToStoreInDatabase = this.merge(this.modelToCreate, this.modelToStoreInDatabase);
        this.modelToStoreInDatabase.lastModifiedAt = Date.now();
    }
    /**
     * You should override this method in subclasses if you do not want to use the built-in merge function which requires to annotate the incoming view model
     */
    merge(source, target) {
        return views_1.merge(source, target, this.logger);
    }
}
exports.AbstractPostState = AbstractPostState;
//# sourceMappingURL=abstract-post-state.js.map