"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPutRelationState = void 0;
const abstract_put_state_1 = require("./abstract-put-state");
class AbstractPutRelationState extends abstract_put_state_1.AbstractPutState {
    extractFromRequest() {
        super.extractFromRequest();
        this.parentId = this.extractFromParams('parentId');
    }
}
exports.AbstractPutRelationState = AbstractPutRelationState;
//# sourceMappingURL=abstract-put-relation-state.js.map