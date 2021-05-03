"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyInfoProvider = void 0;
const tsyringe_1 = require("tsyringe");
const ApiKeyInfoProvider = () => {
    return (target) => {
        tsyringe_1.injectable()(target);
    };
};
exports.ApiKeyInfoProvider = ApiKeyInfoProvider;
//# sourceMappingURL=api-key.decorators.js.map