"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentNegotiator = void 0;
const negotiator_1 = __importDefault(require("negotiator"));
const utils_1 = require("../../utils");
const router_error_1 = require("../../errors/router-error");
const constants_1 = __importDefault(require("../../../constants"));
class ContentNegotiator {
    constructor(routeDefinitions) {
        var _a;
        this.routeDefinitions = routeDefinitions;
        this.producingMediaTypes = [];
        this.consumingMediaTypes = new Set();
        const set = new Set();
        routeDefinitions.forEach((def) => {
            if (def.produces)
                set.add(def.produces);
            if (typeof def.consumes === 'undefined') {
                def.consumes = constants_1.default.DEFAULT_MEDIA_TYPE;
            }
            // def.produces ? `and produces "${def.produces}` : ''
            if (this.consumingMediaTypes.has(def.consumes)) {
                throw new Error(`Conflicting route definitions found. You have registered multiple routes that consumes the media type "${def.consumes}"` +
                    (def.produces ? ` and produces "${def.produces}".` : '.'));
            }
            this.consumingMediaTypes.add(def.consumes);
        });
        this.producingMediaTypes = Array.from(set);
        const duplicatedRouteDefinition = this.findConflictingRoutes();
        if (typeof this.findConflictingRoutes() !== 'undefined')
            throw new Error(`Conflicting route definitions found. You have registered multiple routes that consumes the media type ${duplicatedRouteDefinition.consumes} and produces ${(_a = duplicatedRouteDefinition.produces) !== null && _a !== void 0 ? _a : ''}.`);
    }
    findConflictingRoutes() {
        return utils_1.hasDuplicate(this.routeDefinitions, (a, b) => a.consumes === b.consumes && a.produces === b.produces);
    }
    retrieveHandler(contentType = 'application/octet-stream', accept = '*/*') {
        if (this.consumingMediaTypes.has(contentType) === false) {
            throw new router_error_1.RouterError(415, 'Unsupported Media Type', `Media Type "${contentType}" is not supported for the specific route.`);
        }
        const negotiator = new negotiator_1.default({ headers: { accept } });
        const mediaTypes = negotiator.mediaTypes(this.producingMediaTypes);
        // let's first try to find an exact matching route handler
        for (let i = 0; i < mediaTypes.length; i++) {
            const found = this.routeDefinitions.find((def) => {
                return def.consumes === contentType && def.produces === mediaTypes[i];
            });
            if (typeof found !== 'undefined')
                return found;
        }
        if (accept !== '*/*') {
            throw new router_error_1.RouterError(406, 'Not Acceptable', `Media type "${accept}" is not acceptable. Acceptable media types: ${this.producingMediaTypes.join(', ')}`);
        }
        const found = this.routeDefinitions.find((def) => {
            return def.consumes === contentType && typeof def.produces === 'undefined';
        });
        if (typeof found !== 'undefined')
            return found;
        throw new router_error_1.RouterError(406, 'Not Acceptable', `Media type "${accept}" is not acceptable. Acceptable media types: ${this.producingMediaTypes.join(', ')}`);
    }
}
exports.ContentNegotiator = ContentNegotiator;
//# sourceMappingURL=put.content-negotiator.js.map