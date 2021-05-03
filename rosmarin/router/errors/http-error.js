"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, error, message = error, code) {
        super(message);
        this.status = status;
        this.error = error;
        this.message = message;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=http-error.js.map