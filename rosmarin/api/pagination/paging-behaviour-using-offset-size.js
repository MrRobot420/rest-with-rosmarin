"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingBehaviourUsingOffsetSize = void 0;
const abstract_paging_behaviour_1 = require("./abstract-paging-behaviour");
const url_1 = require("url");
const links_1 = require("../links");
const relation_types_1 = __importDefault(require("../relation-types"));
class PagingBehaviourUsingOffsetSize extends abstract_paging_behaviour_1.AbstractPagingBehaviour {
    constructor(fullUrl, totalNumberOfResults, offset, size, type, defaultPageSize = PagingBehaviourUsingOffsetSize.DEFAULT_PAGE_SIZE) {
        super(fullUrl, type);
        this.totalNumberOfResults = totalNumberOfResults;
        this.offset = offset;
        this.size = size;
        this.defaultPageSize = defaultPageSize;
    }
    hasFirstPage() {
        return this.offset - this.size > 0;
    }
    hasLastPage() {
        return this.currentOffsetPlusTwoPages() < this.totalNumberOfResults;
    }
    hasNextPage() {
        return this.offset + this.size < this.totalNumberOfResults;
    }
    hasPreviousPage() {
        return this.offset > 0;
    }
    getFirstPageLink() {
        const url = new url_1.URL(this.fullUrl);
        url.searchParams.set('offset', '0');
        url.searchParams.set('size', this.getFirstLinkSize());
        return links_1.linkHeader(url.toString(), relation_types_1.default.first, this.type);
    }
    getLastPageLink() {
        const url = new url_1.URL(this.fullUrl);
        url.searchParams.set('offset', this.getLastLinkOffset());
        url.searchParams.set('size', this.getLastLinkSize());
        return links_1.linkHeader(url.toString(), relation_types_1.default.last, this.type);
    }
    getPrevPageLink() {
        const url = new url_1.URL(this.fullUrl);
        url.searchParams.set(PagingBehaviourUsingOffsetSize.QUERY_PARAM_OFFSET, this.getPreviousLinkOffset());
        url.searchParams.set(PagingBehaviourUsingOffsetSize.QUERY_PARAM_SIZE, this.getPreviousLinkSize());
        return links_1.linkHeader(url.toString(), relation_types_1.default.prev, this.type);
    }
    getNextPageLink() {
        const url = new url_1.URL(this.fullUrl);
        url.searchParams.set(PagingBehaviourUsingOffsetSize.QUERY_PARAM_OFFSET, this.getNextLinkOffset());
        url.searchParams.set(PagingBehaviourUsingOffsetSize.QUERY_PARAM_SIZE, this.getNextLinkSize());
        return links_1.linkHeader(url.toString(), relation_types_1.default.next, this.type);
    }
    getLastLinkSize() {
        return Math.min(this.size, this.totalNumberOfResults - +this.getNextLinkOffset() - this.size).toString();
    }
    getLastLinkOffset() {
        return Math.max(this.currentOffsetPlusTwoPages(), this.totalNumberOfResults - this.size).toString();
    }
    currentOffsetPlusTwoPages() {
        return this.offset + this.size * 2;
    }
    getFirstLinkSize() {
        return Math.min(this.size, this.offset - this.size).toString();
    }
    getPreviousLinkSize() {
        return Math.min(this.defaultPageSize, this.size).toString();
    }
    getPreviousLinkOffset() {
        return Math.max(0, this.offset - this.size).toString();
    }
    getNextLinkSize() {
        return Math.min(this.defaultPageSize, this.size).toString();
    }
    getNextLinkOffset() {
        return Math.min(this.totalNumberOfResults - 1, this.offset + this.size).toString();
    }
}
exports.PagingBehaviourUsingOffsetSize = PagingBehaviourUsingOffsetSize;
PagingBehaviourUsingOffsetSize.QUERY_PARAM_SIZE = 'size';
PagingBehaviourUsingOffsetSize.QUERY_PARAM_OFFSET = 'offset';
PagingBehaviourUsingOffsetSize.DEFAULT_PAGE_SIZE = 10;
//# sourceMappingURL=paging-behaviour-using-offset-size.js.map