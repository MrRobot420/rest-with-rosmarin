"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationInfoTokenToRespond = void 0;
/**
 * This class is used to send the JWT token to the user after a successful login during JWT authentication.
 */
class AuthenticationInfoTokenToRespond {
    constructor(tokenHeaderName, token) {
        this.tokenHeaderName = tokenHeaderName;
        this.token = token;
    }
}
exports.AuthenticationInfoTokenToRespond = AuthenticationInfoTokenToRespond;
//# sourceMappingURL=authentication-info-token-to-respond.js.map