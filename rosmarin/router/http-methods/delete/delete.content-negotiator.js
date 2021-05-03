"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentNegotiator = void 0;
const router_error_1 = require("../../errors/router-error");
const utils_1 = require("../../utils");
const negotiator_1 = __importDefault(require("negotiator"));
/**
 * @Delete() routes can be defined without a producing media type
 */
class ContentNegotiator {
    constructor(routeDefinitions) {
        this.routeDefinitions = routeDefinitions;
        this.mediaTypes = routeDefinitions
            .filter((definition) => typeof definition.produces !== 'undefined')
            .map((definition) => definition.produces);
        const duplicatedMediaType = this.findConflictingRoutes();
        if (duplicatedMediaType)
            throw new Error(`Conflicting route definitions found. You have registered multiple routes that produces the media type "${duplicatedMediaType}".`);
    }
    findConflictingRoutes() {
        return utils_1.hasDuplicate(this.mediaTypes, (a, b) => a === b);
    }
    retrieveHandler(accept = '*/*') {
        if (this.mediaTypes.length === 0)
            return this.routeDefinitions[0];
        const negotiator = new negotiator_1.default({ headers: { accept } });
        const acceptedMediaTypes = negotiator.mediaTypes(this.mediaTypes);
        if (acceptedMediaTypes.length === 0) {
            throw new router_error_1.RouterError(406, 'Not Acceptable', `Media type ${accept} is not acceptable. Acceptable media types: ${this.mediaTypes.join(', ')}`);
        }
        return this.routeDefinitions.find((definition) => definition.produces === acceptedMediaTypes[0]);
    }
}
exports.ContentNegotiator = ContentNegotiator;
//# sourceMappingURL=delete.content-negotiator.js.map