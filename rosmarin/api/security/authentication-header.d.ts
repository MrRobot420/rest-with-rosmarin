import { FastifyRequest } from 'fastify';
/**
 * Wraps the authentication header from a Fastify request to provide a clean interface to interact with
 */
export declare class AuthenticationHeader {
    principal: string;
    credential: string;
    readonly token: string;
    readonly authHeader: string;
    constructor();
    constructor(token: string);
    constructor(req: FastifyRequest);
    constructor(principal: string, credential: string);
    isSet(): boolean;
    isTokenAuthentication(): boolean;
}
//# sourceMappingURL=authentication-header.d.ts.map