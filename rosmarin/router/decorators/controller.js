"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const tsyringe_1 = require("tsyringe");
const metadata_stores_1 = require("../../metadata-stores");
const Controller = (path = '/') => {
    return (target) => {
        Reflect.decorate([tsyringe_1.singleton()], target);
        metadata_stores_1.routerMetadataStore.registerController(target, { prefix: path });
        return target;
    };
};
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map