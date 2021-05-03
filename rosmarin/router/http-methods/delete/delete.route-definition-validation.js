"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteRoutes = void 0;
const route_registration_error_1 = require("../../errors/route-registration-error");
const validateDeleteRoutes = (routeDefinitions, controller) => {
    var _a;
    for (const definition of routeDefinitions) {
        if (typeof definition.consumes !== 'undefined') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" provides a consuming media type.`);
        }
        if (typeof ((_a = definition.schema) === null || _a === void 0 ? void 0 : _a.body) !== 'undefined') {
            throw new route_registration_error_1.RouteRegistrationError(`Route handler "${controller + '.' + definition.method.toString()}" provides request body validation.`);
        }
    }
};
exports.validateDeleteRoutes = validateDeleteRoutes;
//# sourceMappingURL=delete.route-definition-validation.js.map