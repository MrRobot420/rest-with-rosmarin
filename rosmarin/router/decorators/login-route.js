"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const route_1 = require("./route");
const Login = (routeDefinition = {}) => {
    var _a;
    return route_1.Route(Object.assign(Object.assign({}, routeDefinition), { httpMethod: 'GET', viewConverter: (_) => '', produces: 'text/plain', path: (_a = routeDefinition.path) !== null && _a !== void 0 ? _a : '/login' }));
};
exports.Login = Login;
//# sourceMappingURL=login-route.js.map