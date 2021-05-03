"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyHeader = void 0;
class ApiKeyHeader {
    constructor(req) {
        this.req = req;
    }
    getApiKey(apiKeyHeader) {
        const apiKey = this.req.headers[apiKeyHeader];
        this.apiKey = Array.isArray(apiKey) ? apiKey[0] : apiKey;
        return this.apiKey;
    }
}
exports.ApiKeyHeader = ApiKeyHeader;
//# sourceMappingURL=api-key-header.js.map