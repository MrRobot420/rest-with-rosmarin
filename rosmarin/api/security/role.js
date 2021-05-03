"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    constructor(roleName, toBeUsedForMissingAuthentication = false) {
        this.roleName = roleName;
        this.toBeUsedForMissingAuthentication = toBeUsedForMissingAuthentication;
    }
}
exports.Role = Role;
//# sourceMappingURL=role.js.map