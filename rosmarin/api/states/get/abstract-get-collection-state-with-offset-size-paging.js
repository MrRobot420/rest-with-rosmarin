"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGetCollectionStateWithOffsetSizePaging = void 0;
const abstract_get_collection_state_1 = require("./abstract-get-collection-state");
const pagination_1 = require("../../pagination");
class AbstractGetCollectionStateWithOffsetSizePaging extends abstract_get_collection_state_1.AbstractGetCollectionState {
    definePagingBehaviour() {
        return new pagination_1.PagingBehaviourUsingOffsetSize(this.req.fullUrl(), this.databaseResult.totalNumberOfResult, this.offset, this.size, this.getAcceptedMediaType(), this.getDefaultSize());
    }
    extractFromRequest() {
        super.extractFromRequest();
        this.size = this.extractNumberFromQuery('size', this.getDefaultSize());
        this.offset = this.extractNumberFromQuery('offset', this.getDefaultOffset());
    }
    getDefaultSize() {
        return 10;
    }
    getDefaultOffset() {
        return 0;
    }
}
exports.AbstractGetCollectionStateWithOffsetSizePaging = AbstractGetCollectionStateWithOffsetSizePaging;
//# sourceMappingURL=abstract-get-collection-state-with-offset-size-paging.js.map