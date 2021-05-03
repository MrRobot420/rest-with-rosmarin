"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.Logical = void 0;
const role_1 = require("./role");
var Logical;
(function (Logical) {
    Logical[Logical["AND"] = 0] = "AND";
    Logical[Logical["OR"] = 1] = "OR";
})(Logical = exports.Logical || (exports.Logical = {}));
class Roles {
    constructor(roleOrLogical, ...roles) {
        if (typeof roleOrLogical === 'undefined' &&
            (typeof roles === 'undefined' || (roles === null || roles === void 0 ? void 0 : roles.length) === 0)) {
            this.roles = [];
            this.logical = Logical.AND;
        }
        else if (roleOrLogical instanceof role_1.Role) {
            this.roles = [roleOrLogical];
            this.logical = Logical.AND;
        }
        else {
            this.roles = roles;
            this.logical = roleOrLogical;
        }
    }
    static createLogicalOrRoles(...roles) {
        const theRoles = roles.map((role) => new role_1.Role(role));
        return new Roles(Logical.OR, ...theRoles);
    }
    matches(roleNames) {
        const roleAsSet = new Set(roleNames);
        if (this.logical === Logical.AND) {
            return this.matchLogicalAnd(roleAsSet);
        }
        else {
            return this.matchLogicalOr(roleAsSet);
        }
    }
    matchLogicalOr(roleAsSet) {
        return this.roles.some((role) => roleAsSet.has(role.roleName));
    }
    matchLogicalAnd(roleAsSet) {
        return this.roles.every((role) => roleAsSet.has(role.roleName));
    }
    matchesWithoutAuthentication() {
        return this.roles.some((role) => role.toBeUsedForMissingAuthentication);
    }
}
exports.Roles = Roles;
//# sourceMappingURL=roles.js.map