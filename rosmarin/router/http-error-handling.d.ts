import { FastifyReply, FastifyRequest } from 'fastify';
export declare const handleError: (error: any, request: FastifyRequest, reply: FastifyReply) => void;
export declare const notFound: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
export declare const sendErrorResponse: (reply: FastifyReply, error: unknown) => void;
//# sourceMappingURL=http-error-handling.d.ts.map