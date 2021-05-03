"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractResult = void 0;
class AbstractResult {
    constructor() {
        this._hasError = false;
    }
    hasError() {
        return this._hasError;
    }
    setError(errorCode, errorMessage) {
        this._hasError = true;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
exports.AbstractResult = AbstractResult;
//# sourceMappingURL=abstract-result.js.map