"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMetadataStore = exports.RouterMetadataStore = void 0;
class RouterMetadataStore {
    constructor() {
        this.controllers = new Map();
        this.routes = new Map();
    }
    registerController(ctor, metadata) {
        this.controllers.set(ctor, metadata);
    }
    getController(ctor) {
        return this.controllers.get(ctor);
    }
    addRoute(ctor, routeDefinition) {
        if (this.routes.has(ctor) === false) {
            this.routes.set(ctor, []);
        }
        this.routes.get(ctor).push(routeDefinition);
    }
    getRoutes(ctor) {
        var _a;
        return (_a = this.routes.get(ctor)) !== null && _a !== void 0 ? _a : [];
    }
    clear() {
        this.controllers.clear();
        this.routes.clear();
    }
}
exports.RouterMetadataStore = RouterMetadataStore;
exports.routerMetadataStore = new RouterMetadataStore();
//# sourceMappingURL=router.store.js.map