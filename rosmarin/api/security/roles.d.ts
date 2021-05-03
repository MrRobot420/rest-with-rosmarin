import { Role } from './role';
export declare enum Logical {
    AND = 0,
    OR = 1
}
export declare class Roles {
    private readonly roles;
    private readonly logical;
    static createLogicalOrRoles(...roles: string[]): Roles;
    constructor();
    constructor(role: Role);
    constructor(logical: Logical, ...roles: Role[]);
    matches(roleNames: string[]): boolean;
    private matchLogicalOr;
    private matchLogicalAnd;
    matchesWithoutAuthentication(): boolean;
}
//# sourceMappingURL=roles.d.ts.map