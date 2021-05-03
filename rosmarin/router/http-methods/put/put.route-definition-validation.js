"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePutRoutes = void 0;
const route_registration_error_1 = require("../../errors/route-registration-error");
const validatePutRoutes = (routeDefinitions, controller) => {
    var _a;
    for (const definition of routeDefinitions) {
        if (typeof definition.consumes === 'undefined') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" does NOT provide a consuming media type but it's required.`);
        }
        if (typeof ((_a = definition.schema) === null || _a === void 0 ? void 0 : _a.body.transformer) !== 'function') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" does NOT provide request body type.`);
        }
    }
};
exports.validatePutRoutes = validatePutRoutes;
//# sourceMappingURL=put.route-definition-validation.js.map