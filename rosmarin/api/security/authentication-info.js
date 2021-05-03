"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationInfo = void 0;
class AuthenticationInfo {
    constructor(principal, credential, roles, userModel) {
        this.principal = principal;
        this.credential = credential;
        this.roles = roles;
        this.userModel = userModel;
    }
    static isAuthenticated(isAuthenticated) {
        const authenticationInfo = new AuthenticationInfo();
        authenticationInfo.isAuthenticated = isAuthenticated;
        authenticationInfo.tokenToRespond = undefined;
        return authenticationInfo;
    }
    static withTokenToRespond(tokenToRespond) {
        const authenticationInfo = AuthenticationInfo.isAuthenticated(true);
        authenticationInfo.tokenToRespond = tokenToRespond;
        return authenticationInfo;
    }
    static withTokenToRespondAndPrincipal(tokenToRespond, principal, roles, userModel) {
        const authenticationInfo = AuthenticationInfo.withTokenToRespond(tokenToRespond);
        authenticationInfo.principal = principal;
        authenticationInfo.roles = roles;
        authenticationInfo.userModel = userModel;
        return authenticationInfo;
    }
    hasRoles(roles) {
        return roles.matches(this.roles);
    }
    clearTokenToRespond() {
        this.tokenToRespond = undefined;
    }
}
exports.AuthenticationInfo = AuthenticationInfo;
AuthenticationInfo.NOT_AUTHENTICATED = AuthenticationInfo.isAuthenticated(false);
//# sourceMappingURL=authentication-info.js.map