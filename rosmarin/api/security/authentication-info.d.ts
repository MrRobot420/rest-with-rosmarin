import { AbstractModel } from '../../models';
import { Roles } from './roles';
import { AuthenticationInfoTokenToRespond } from './authentication-info-token-to-respond';
export declare class AuthenticationInfo {
    static readonly NOT_AUTHENTICATED: AuthenticationInfo;
    principal: string;
    credential: string;
    roles: string[];
    isAuthenticated: boolean;
    userModel: AbstractModel;
    tokenToRespond: AuthenticationInfoTokenToRespond | undefined;
    static isAuthenticated(isAuthenticated: boolean): AuthenticationInfo;
    static withTokenToRespond(tokenToRespond: AuthenticationInfoTokenToRespond): AuthenticationInfo;
    static withTokenToRespondAndPrincipal(tokenToRespond: AuthenticationInfoTokenToRespond, principal: string, roles: string[], userModel: AbstractModel): AuthenticationInfo;
    constructor();
    constructor(principal: string, credential: string);
    constructor(principal: string, credential: string, roles: string[]);
    constructor(principal: string, credential: string, roles: string[], userModel: AbstractModel);
    hasRoles(roles: Roles): boolean;
    clearTokenToRespond(): void;
}
//# sourceMappingURL=authentication-info.d.ts.map