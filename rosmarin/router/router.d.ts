import { AddContentTypeParser, FastifyInstance } from 'fastify';
import { Logger } from 'pino';
import { RouterConfig } from './router-config';
import { Constructor } from '../types';
export declare class Router {
    private readonly routerConfig;
    private readonly fastify;
    private readonly logger;
    readonly addContentType: AddContentTypeParser;
    constructor(logger: Logger, routerConfig?: RouterConfig);
    private configureFastify;
    listen(port: number, host: string): Promise<string>;
    registerControllers(controllers: Constructor[]): void;
    private getPrefix;
    registerController(controller: Constructor, fastify: FastifyInstance): void;
    private buildRoutes;
    private compileRouteDefinitions;
    private validateRegisteredRouterPath;
}
//# sourceMappingURL=router.d.ts.map