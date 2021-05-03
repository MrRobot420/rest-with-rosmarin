"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouteHandler = void 0;
const http_methods_1 = require("./http-methods");
/**
 * Custom HTTP methods like LINK could be possible when https://github.com/delvedor/find-my-way/pull/178 lands
 */
const createRouteHandler = (routeDefinitions, controller, httpMethod) => {
    switch (httpMethod) {
        case 'GET': {
            return http_methods_1.getRouteHandler(routeDefinitions, controller);
        }
        case 'POST': {
            return http_methods_1.postRouteHandler(routeDefinitions, controller);
        }
        case 'DELETE': {
            return http_methods_1.deleteRouteHandler(routeDefinitions, controller);
        }
        case 'PUT': {
            return http_methods_1.putRouteHandler(routeDefinitions, controller);
        }
        default: {
            throw new Error(`HTTP method ${httpMethod} is not supported.`);
        }
    }
};
exports.createRouteHandler = createRouteHandler;
//# sourceMappingURL=route-handler.js.map