import { HttpResponse } from '../../router/http-response';
import { FastifyRequest } from 'fastify';
import { AbstractStateWithCaching } from './abstract-state-with-caching';
export declare class LoginState extends AbstractStateWithCaching {
    constructor();
    protected req: FastifyRequest;
    protected buildInternal(): Promise<HttpResponse>;
    protected createResponse(): Promise<HttpResponse>;
    protected defineTransitionLinks(): Promise<void> | void;
    protected extractFromRequest(): void;
    protected configureState(): void;
}
//# sourceMappingURL=login-state.d.ts.map