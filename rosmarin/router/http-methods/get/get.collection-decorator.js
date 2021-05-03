"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCollection = void 0;
const decorators_1 = require("../../decorators");
const GetCollection = (routeDefinition) => {
    return decorators_1.Route(Object.assign(Object.assign({}, routeDefinition), { httpMethod: 'GET' }));
};
exports.GetCollection = GetCollection;
//# sourceMappingURL=get.collection-decorator.js.map