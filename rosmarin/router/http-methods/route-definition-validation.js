"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRouteDefinitions = void 0;
const get_route_definition_validation_1 = require("./get/get.route-definition-validation");
const delete_route_definition_validation_1 = require("./delete/delete.route-definition-validation");
const post_route_definition_validation_1 = require("./post/post.route-definition-validation");
const put_route_definition_validation_1 = require("./put/put.route-definition-validation");
const validateRouteDefinitions = (routeDefinitions, httpMethod, controller) => {
    switch (httpMethod) {
        case 'GET': {
            get_route_definition_validation_1.validateGetRoutes(routeDefinitions, controller);
            break;
        }
        case 'POST': {
            post_route_definition_validation_1.validatePostRoutes(routeDefinitions, controller);
            break;
        }
        case 'DELETE': {
            delete_route_definition_validation_1.validateDeleteRoutes(routeDefinitions, controller);
            break;
        }
        case 'PUT': {
            put_route_definition_validation_1.validatePutRoutes(routeDefinitions, controller);
            break;
        }
        case 'PATCH':
            break;
        case 'HEAD':
            break;
        case 'OPTIONS':
            break;
    }
};
exports.validateRouteDefinitions = validateRouteDefinitions;
//# sourceMappingURL=route-definition-validation.js.map