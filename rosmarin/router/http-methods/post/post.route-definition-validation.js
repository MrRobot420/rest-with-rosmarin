"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostRoutes = void 0;
const route_registration_error_1 = require("../../errors/route-registration-error");
const validatePostRoutes = (routeDefinitions, controller) => {
    for (const definition of routeDefinitions) {
        if (typeof definition.consumes === 'undefined') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" does NOT provide a consuming media type but it's required.`);
        }
        if (typeof definition.produces !== 'undefined') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" provides a producing media type.`);
        }
        if (typeof definition.viewConverter !== 'undefined') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" provides a View Converter.`);
        }
        if (typeof definition.schema.body.transformer !== 'function') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" does NOT provide request body type.`);
        }
    }
};
exports.validatePostRoutes = validatePostRoutes;
//# sourceMappingURL=post.route-definition-validation.js.map