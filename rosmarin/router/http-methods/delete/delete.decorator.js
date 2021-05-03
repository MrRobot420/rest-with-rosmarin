"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const decorators_1 = require("../../decorators");
const Delete = (routeDefinition = { path: '/:id' }) => {
    return decorators_1.Route(Object.assign(Object.assign({ path: '/:id' }, routeDefinition), { httpMethod: 'DELETE' }));
};
exports.Delete = Delete;
//# sourceMappingURL=delete.decorator.js.map