"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationInfoProvider = void 0;
const tsyringe_1 = require("tsyringe");
const AuthenticationInfoProvider = () => {
    return (target) => {
        tsyringe_1.injectable()(target);
    };
};
exports.AuthenticationInfoProvider = AuthenticationInfoProvider;
//# sourceMappingURL=security.decorators.js.map