"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyInfo = void 0;
// Use a class instead of an interface to provide the possibility of inheritance
class ApiKeyInfo {
    constructor(valid) {
        this.valid = valid;
    }
    isValid() {
        return this.valid;
    }
}
exports.ApiKeyInfo = ApiKeyInfo;
//# sourceMappingURL=api-key-info.js.map