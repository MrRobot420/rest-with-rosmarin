"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const metadata_stores_1 = require("../../metadata-stores");
/**
 * This method/decorator gives the user the possibility to define arbitrary controller routes. However, it is strongly
 * recommended not to use this method, as it is possible to define non-HTTP and REST compliant routes with this method.
 *
 * PLEASE use the HTTP method specific methods/decorators.
 */
const Route = (routeDefinition) => {
    return function (target, method, descriptor) {
        metadata_stores_1.routerMetadataStore.addRoute(target.constructor, Object.assign(Object.assign({}, routeDefinition), { method }));
        return descriptor;
    };
};
exports.Route = Route;
//# sourceMappingURL=route.js.map