"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
const decorators_1 = require("../../decorators");
const Get = (routeDefinition) => {
    return decorators_1.Route(Object.assign(Object.assign({ path: '/:id' }, routeDefinition), { httpMethod: 'GET' }));
};
exports.Get = Get;
//# sourceMappingURL=get.decorator.js.map