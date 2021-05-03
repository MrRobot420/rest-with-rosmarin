"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPostRelationState = void 0;
const abstract_post_state_1 = require("./abstract-post-state");
class AbstractPostRelationState extends abstract_post_state_1.AbstractPostState {
    extractFromRequest() {
        super.extractFromRequest();
        this.parentId = this.extractFromParams('id');
    }
}
exports.AbstractPostRelationState = AbstractPostRelationState;
//# sourceMappingURL=abstract-post-relation-state.js.map