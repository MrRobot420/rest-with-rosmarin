"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentNegotiator = void 0;
const router_error_1 = require("../../errors/router-error");
const utils_1 = require("../../utils");
/**
 * This content negotiator assumes that the response payload of a POST request is empty.
 */
class ContentNegotiator {
    constructor(routeDefinitions) {
        this.routeDefinitions = routeDefinitions;
        this.mediaTypes = routeDefinitions.map((definition) => definition.consumes);
        const duplicatedMediaType = this.findConflictingRoutes();
        if (duplicatedMediaType)
            throw new Error(`Conflicting route definitions found. You have registered multiple routes that consumes the media type "${duplicatedMediaType}".`);
    }
    findConflictingRoutes() {
        return utils_1.hasDuplicate(this.mediaTypes, (a, b) => a === b);
    }
    /**
     * If no Content-Type header is provided, rosmarin DOES assume that the content type is "application/octet-stream"
     * as suggested in https://tools.ietf.org/html/rfc7231#section-3.1.1.5.
     */
    retrieveHandler(contentType = 'application/octet-stream') {
        const found = this.routeDefinitions.find((def) => {
            return def.consumes === contentType;
        });
        if (typeof found === 'undefined') {
            throw new router_error_1.RouterError(415, 'Unsupported Media Type', `Media Type ${contentType} is not supported for the specific route.`);
        }
        return found;
    }
}
exports.ContentNegotiator = ContentNegotiator;
//# sourceMappingURL=post.content-negotiator.js.map