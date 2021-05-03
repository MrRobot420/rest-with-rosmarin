import { FastifyRequest } from 'fastify';
export declare class ApiKeyHeader {
    private readonly req;
    private apiKey;
    constructor(req: FastifyRequest);
    getApiKey(apiKeyHeader: string): string;
}
//# sourceMappingURL=api-key-header.d.ts.map