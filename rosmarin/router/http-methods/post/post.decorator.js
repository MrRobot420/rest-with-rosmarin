"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const decorators_1 = require("../../decorators");
const Post = (routeDefinition) => {
    return decorators_1.Route(Object.assign(Object.assign({}, routeDefinition), { httpMethod: 'POST' }));
};
exports.Post = Post;
//# sourceMappingURL=post.decorator.js.map