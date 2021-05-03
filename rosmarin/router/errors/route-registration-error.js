"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteRegistrationError = void 0;
class RouteRegistrationError extends Error {
    constructor(message, details) {
        super(message);
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.RouteRegistrationError = RouteRegistrationError;
//# sourceMappingURL=route-registration-error.js.map