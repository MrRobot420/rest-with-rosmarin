"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.notFound = exports.handleError = void 0;
const api_1 = require("../api");
const router_error_1 = require("./errors/router-error");
const serialization_1 = require("./serialization");
const http_error_1 = require("./errors/http-error");
const cacheControl = new api_1.CacheControl();
cacheControl.noCache = true;
cacheControl.noStore = true;
cacheControl.noTransform = true;
const errorCacheControl = cacheControl.toString();
const errorMediaType = 'application/vnd.error+json';
const handleError = (
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
error, request, reply) => {
    if (error instanceof router_error_1.RouterError || error instanceof http_error_1.HttpError) {
        reply
            .header('Cache-Control', errorCacheControl)
            .status(error.status)
            .type(errorMediaType)
            .serializer(serialization_1.serializeErrorResponse)
            .send(error);
        return;
    }
    if (error.code === 'FST_ERR_CTP_INVALID_MEDIA_TYPE') {
        delete error.code;
        error.status = error.statusCode;
        delete error.statusCode;
        reply
            .header('Cache-Control', errorCacheControl)
            .status(415)
            .type(errorMediaType)
            .serializer(serialization_1.serializeErrorResponse)
            .send(error);
        return;
    }
    request.log.error(`An unexpected error has occurred.\n${error.stack}`);
    reply
        .header('Cache-Control', errorCacheControl)
        .type(errorMediaType)
        .status(500)
        .serializer(serialization_1.serializeErrorResponse)
        .send({
        status: 500,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred.',
    });
};
exports.handleError = handleError;
const notFound = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    reply
        .code(404)
        .header('Cache-Control', errorCacheControl)
        .serializer(serialization_1.serializeErrorResponse)
        .type(errorMediaType)
        .send({
        status: 404,
        error: 'Not Found',
        message: `Route { ${req.method} ${req.url} } not found.`,
    });
});
exports.notFound = notFound;
const sendErrorResponse = (reply, error) => {
    // Why no status code is set? Because the status code is already set in a state
    reply
        .serializer(serialization_1.serializeErrorResponse)
        .header('Cache-Control', errorCacheControl)
        .type(errorMediaType)
        .send(error);
};
exports.sendErrorResponse = sendErrorResponse;
//# sourceMappingURL=http-error-handling.js.map