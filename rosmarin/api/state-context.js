"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateContext = void 0;
class StateContext {
    constructor(store) {
        this.store = store ? store : {};
    }
    put(key, value) {
        this.store[key] = value;
    }
    get(key) {
        return this.store[key];
    }
}
exports.StateContext = StateContext;
StateContext.ST_HTTP_HEADER = 'header';
StateContext.ST_AUTH_USER = 'auth';
//# sourceMappingURL=state-context.js.map