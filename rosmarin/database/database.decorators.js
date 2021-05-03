"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectUserRepository = exports.UserRepository = exports.Repository = void 0;
const tsyringe_1 = require("tsyringe");
const Repository = (_) => tsyringe_1.singleton;
exports.Repository = Repository;
const UserRepository = (target) => {
    tsyringe_1.container.register('UserRepository', target, {
        lifecycle: tsyringe_1.Lifecycle.Singleton,
    });
};
exports.UserRepository = UserRepository;
const injectUserRepository = () => {
    return tsyringe_1.inject('UserRepository');
};
exports.injectUserRepository = injectUserRepository;
//# sourceMappingURL=database.decorators.js.map