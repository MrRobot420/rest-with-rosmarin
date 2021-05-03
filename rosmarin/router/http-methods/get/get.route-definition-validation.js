"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetRoutes = void 0;
const route_registration_error_1 = require("../../errors/route-registration-error");
const validateGetRoutes = (routeDefinitions, controller) => {
    for (const definition of routeDefinitions) {
        if (typeof definition.produces !== 'string') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" does not provide a producing media type but it is required.`);
        }
        if (typeof definition.viewConverter !== 'function') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" does not provide a View Converter.`);
        }
        if (typeof definition.consumes !== 'undefined') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" provides a consuming media type which is NOT HTTP compliant.`);
        }
    }
};
exports.validateGetRoutes = validateGetRoutes;
//# sourceMappingURL=get.route-definition-validation.js.map