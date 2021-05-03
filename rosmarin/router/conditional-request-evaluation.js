"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateConditionalPutRequest = exports.evaluateConditionalGetRequest = exports.evaluate = void 0;
const evaluate = (serverEtag, serverDate, clientEtag, clientDate) => {
    return (serverEtag === clientEtag ||
        new Date(clientDate).getTime() >
            (serverDate instanceof Date ? serverDate.getTime() : serverDate));
};
exports.evaluate = evaluate;
// Arrow function would break the "this" binding
function evaluateConditionalGetRequest(lastModifiedAt, etag) {
    return exports.evaluate(etag, lastModifiedAt, this.headers['if-none-match'], this.headers['if-modified-since']);
}
exports.evaluateConditionalGetRequest = evaluateConditionalGetRequest;
// Aka Conditional PUT
function evaluateConditionalPutRequest(lastModifiedAt, etag) {
    return exports.evaluate(etag, lastModifiedAt, this.headers['if-match'], this.headers['if-unmodified-since']);
}
exports.evaluateConditionalPutRequest = evaluateConditionalPutRequest;
//# sourceMappingURL=conditional-request-evaluation.js.map