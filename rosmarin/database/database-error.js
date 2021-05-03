"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
/**
 * Error that should be thrown only in the persistence layer
 */
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.DatabaseError = DatabaseError;
//# sourceMappingURL=database-error.js.map