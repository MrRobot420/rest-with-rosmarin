"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = void 0;
const decorators_1 = require("../../decorators");
const Put = (routeDefinition) => {
    return decorators_1.Route(Object.assign(Object.assign({ path: '/:id' }, routeDefinition), { httpMethod: 'PUT' }));
};
exports.Put = Put;
//# sourceMappingURL=put.decorator.js.map