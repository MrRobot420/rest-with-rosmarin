"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDeleteRelationState = void 0;
const abstract_delete_state_1 = require("./abstract-delete-state");
class AbstractDeleteRelationState extends abstract_delete_state_1.AbstractDeleteState {
    extractFromRequest() {
        super.extractFromRequest();
        this.parentId = this.extractFromParams('parentId');
    }
}
exports.AbstractDeleteRelationState = AbstractDeleteRelationState;
//# sourceMappingURL=abstract-delete-relation-state.js.map