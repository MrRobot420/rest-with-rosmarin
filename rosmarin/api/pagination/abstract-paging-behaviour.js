"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPagingBehaviour = void 0;
const links_1 = require("../links");
const relation_types_1 = __importDefault(require("../relation-types"));
class AbstractPagingBehaviour {
    constructor(fullUrl, type) {
        this.fullUrl = fullUrl;
        this.type = type;
    }
    getSelfLink() {
        return links_1.linkHeader(this.fullUrl, relation_types_1.default.self, this.type);
    }
    build(response) {
        response.link(this.getSelfLink());
        if (this.hasPreviousPage())
            response.link(this.getPrevPageLink());
        if (this.hasNextPage())
            response.link(this.getNextPageLink());
        if (this.hasLastPage())
            response.link(this.getLastPageLink());
        if (this.hasFirstPage())
            response.link(this.getFirstPageLink());
    }
}
exports.AbstractPagingBehaviour = AbstractPagingBehaviour;
//# sourceMappingURL=abstract-paging-behaviour.js.map