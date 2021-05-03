"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterError = void 0;
/**
 * HTTP error thrown during runtime within the router.
 *
 * DO NOT use it in your application.
 */
class RouterError extends Error {
    constructor(status, error, message = error, code) {
        super(message);
        this.status = status;
        this.error = error;
        this.message = message;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    toJSON() {
        if (typeof this.code === 'undefined') {
            return {
                status: this.status,
                error: this.error,
                message: this.message,
            };
        }
        else {
            return {
                status: this.status,
                code: this.code,
                error: this.error,
                message: this.message,
            };
        }
    }
}
exports.RouterError = RouterError;
//# sourceMappingURL=router-error.js.map