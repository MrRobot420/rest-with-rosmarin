"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentNegotiator = void 0;
const negotiator_1 = __importDefault(require("negotiator"));
const router_error_1 = require("../../errors/router-error");
const utils_1 = require("../../utils");
const constants_1 = __importDefault(require("../../../constants"));
const route_registration_error_1 = require("../../errors/route-registration-error");
/**
 * If a route definition has no producing media type the default  media type "application/json" is set.
 */
class ContentNegotiator {
    constructor(routeDefinitions) {
        this.routeDefinitions = routeDefinitions;
        this.routeDefinitions = routeDefinitions.map((definition) => {
            if (typeof definition.produces === 'undefined')
                definition.produces = constants_1.default.DEFAULT_MEDIA_TYPE;
            return definition;
        });
        this.mediaTypes = routeDefinitions.map((definition) => definition.produces);
        const duplicatedMediaType = this.findConflictingRoutes();
        if (duplicatedMediaType)
            throw new route_registration_error_1.RouteRegistrationError(`Conflicting route definitions found. You have registered multiple routes that produces the media type "${duplicatedMediaType}".`);
    }
    findConflictingRoutes() {
        return utils_1.hasDuplicate(this.mediaTypes, (a, b) => a === b);
    }
    /**
     * If no Accept header is sent by the client implies that client accepts any media type
     * See https://tools.ietf.org/html/rfc7231#section-5.3.2
     */
    retrieveHandler(accept = '*/*') {
        const negotiator = new negotiator_1.default({ headers: { accept } });
        const acceptedMediaTypes = negotiator.mediaTypes(this.mediaTypes);
        if (acceptedMediaTypes.length === 0) {
            /*
            If the media type is not acceptable the server SHOULD generate a payload containing a list of available media types.
            See https://tools.ietf.org/html/rfc7231#section-6.5.6
             */
            throw new router_error_1.RouterError(406, 'Not Acceptable', `Media type "${accept}" is not acceptable. Acceptable media types: ${this.mediaTypes.join(', ')}.`);
        }
        return this.routeDefinitions.find((definition) => definition.produces === acceptedMediaTypes[0]);
    }
}
exports.ContentNegotiator = ContentNegotiator;
//# sourceMappingURL=get.content-negotiator.js.map