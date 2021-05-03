"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
class HttpResponse {
    constructor(reply) {
        this.reply = reply;
        this.isError = false;
        this.reply.status(200);
    }
    ok(entity) {
        if (entity)
            this.entity = entity;
        this.reply.code(200);
        return this;
    }
    created(entity) {
        if (entity)
            this.entity = entity;
        this.reply.code(201);
        return this;
    }
    noContent() {
        this.reply.code(204);
        this.entity = undefined;
        return this;
    }
    notModified() {
        this.reply.code(304);
        this.entity = undefined;
        return this;
    }
    badRequest(errorMsg, code) {
        return this.error({
            status: 400,
            message: errorMsg,
            code: code,
            error: 'Bad Request',
        });
    }
    unauthorized(errorMsg = 'Not authorized.', code) {
        return this.error({
            status: 401,
            message: errorMsg,
            code: code,
            error: 'Unauthorized',
        });
    }
    forbidden(errorMsg = 'You have no power here!', code) {
        return this.error({
            status: 403,
            message: errorMsg,
            code: code,
            error: 'Forbidden',
        });
    }
    notFound(errorMsg = 'This resource does not exist.', code) {
        return this.error({
            status: 404,
            message: errorMsg,
            code: code,
            error: 'Not Found',
        });
    }
    notAcceptable(errorMsg, code) {
        return this.error({
            status: 406,
            message: errorMsg,
            code: code,
            error: 'Not Acceptable',
        });
    }
    preconditionFailed(errorMsg = '', code) {
        return this.error({
            status: 412,
            message: errorMsg,
            code: code,
            error: 'Precondition Failed',
        });
    }
    unsupportedMediaType(errorMsg, code) {
        return this.error({
            status: 415,
            message: errorMsg,
            code: code,
            error: 'Unsupported Media Type',
        });
    }
    internalServerError(errorMsg = 'An unexpected error occurred.', code) {
        return this.error({
            status: 500,
            message: errorMsg,
            code: code,
            error: 'Internal Server Error',
        });
    }
    /**
     *
     * some helper methods for common HTTP errors
     *
     */
    apiKeyRequired(errorMsg = 'API key required.', code = 100) {
        return this.error({
            status: 401,
            message: errorMsg,
            code: code,
            error: 'Unauthorized',
        });
    }
    error(error) {
        this.isError = true;
        this.entity = error;
        this.reply.code(error.status);
        return this;
    }
    link(link) {
        var _a;
        const linkHeaders = (_a = this.reply.getHeader('link')) !== null && _a !== void 0 ? _a : [];
        if (Array.isArray(linkHeaders)) {
            linkHeaders.push(link);
            this.reply.header('link', linkHeaders);
            return this;
        }
        this.reply.header('link', [linkHeaders, link]);
        return this;
    }
    header(key, value) {
        this.reply.header(key, value);
        return this;
    }
    cacheControl(cacheControl) {
        this.header('cache-control', cacheControl.toString());
        return this;
    }
    lastModified(date) {
        this.header('last-modified', date.toUTCString());
        return this;
    }
    etag(etag) {
        this.header('etag', etag);
        return this;
    }
    location(location) {
        this.header('location', location);
        return this;
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=http-response.js.map