import { FastifyRequest } from 'fastify';
export declare const evaluate: (serverEtag: string, serverDate: number | Date, clientEtag: string, clientDate: string) => boolean;
export declare function evaluateConditionalGetRequest(this: FastifyRequest, lastModifiedAt: number | Date, etag: string): boolean;
export declare function evaluateConditionalPutRequest(this: FastifyRequest, lastModifiedAt: number | Date, etag: string): boolean;
//# sourceMappingURL=conditional-request-evaluation.d.ts.map