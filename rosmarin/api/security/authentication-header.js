"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationHeader = void 0;
/**
 * Wraps the authentication header from a Fastify request to provide a clean interface to interact with
 */
class AuthenticationHeader {
    constructor(principalOrTokenOrRequest, credential) {
        this.principal = '';
        this.credential = '';
        if (typeof principalOrTokenOrRequest === 'undefined' &&
            typeof credential === 'undefined') {
            this.authHeader = undefined;
        }
        else if (typeof principalOrTokenOrRequest === 'string' &&
            typeof credential === 'string') {
            this.credential = credential;
            this.principal = principalOrTokenOrRequest;
        }
        else if (typeof principalOrTokenOrRequest === 'string' &&
            typeof credential === 'undefined') {
            this.token = principalOrTokenOrRequest;
        }
        else {
            const request = principalOrTokenOrRequest;
            this.authHeader = request.headers.authorization;
            if (this.authHeader !== undefined) {
                if (this.authHeader.startsWith('Basic ') ||
                    this.authHeader.startsWith('basic ')) {
                    const withoutBasic = this.authHeader.replace(/[Bb]asic /, '');
                    const userColonPass = Buffer.from(withoutBasic, 'base64').toString('utf-8');
                    const asArray = userColonPass.split(':');
                    if (asArray.length === 2) {
                        this.principal = asArray[0];
                        this.credential = asArray[1];
                    }
                }
                else {
                    this.token = this.authHeader.replace(/[Bb]earer /, '');
                }
            }
        }
    }
    isSet() {
        return this.authHeader !== undefined;
    }
    isTokenAuthentication() {
        return !!this.token;
    }
}
exports.AuthenticationHeader = AuthenticationHeader;
//# sourceMappingURL=authentication-header.js.map