import { FastifyReply } from 'fastify';
import { CacheControl } from '../api/caching/cache-control';
export declare type Header = number | string | string[] | undefined;
export declare class HttpResponse {
    private readonly reply;
    entity: unknown | undefined;
    isError: boolean;
    constructor(reply: FastifyReply);
    ok(entity?: unknown): HttpResponse;
    created(entity?: unknown): HttpResponse;
    noContent(): HttpResponse;
    notModified(): HttpResponse;
    badRequest(errorMsg: string, code?: string | number): HttpResponse;
    unauthorized(errorMsg?: string, code?: string | number): HttpResponse;
    forbidden(errorMsg?: string, code?: string | number): HttpResponse;
    notFound(errorMsg?: string, code?: string | number): HttpResponse;
    notAcceptable(errorMsg: string, code?: string | number): HttpResponse;
    preconditionFailed(errorMsg?: string, code?: string | number): HttpResponse;
    unsupportedMediaType(errorMsg: string, code?: string | number): HttpResponse;
    internalServerError(errorMsg?: string, code?: string | number): HttpResponse;
    /**
     *
     * some helper methods for common HTTP errors
     *
     */
    apiKeyRequired(errorMsg?: string, code?: string | number): HttpResponse;
    private error;
    link(link: string): HttpResponse;
    header(key: string, value: Header): HttpResponse;
    cacheControl(cacheControl: CacheControl): HttpResponse;
    lastModified(date: Date): HttpResponse;
    etag(etag: string): HttpResponse;
    location(location: string): HttpResponse;
}
//# sourceMappingURL=http-response.d.ts.map