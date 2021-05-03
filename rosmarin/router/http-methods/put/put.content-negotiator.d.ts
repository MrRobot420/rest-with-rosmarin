import { CompiledRouteDefinition } from '../../route-definitions';
export declare class ContentNegotiator {
    private readonly routeDefinitions;
    private readonly producingMediaTypes;
    private readonly consumingMediaTypes;
    constructor(routeDefinitions: CompiledRouteDefinition[]);
    private findConflictingRoutes;
    retrieveHandler(contentType?: string, accept?: string): CompiledRouteDefinition;
}
//# sourceMappingURL=put.content-negotiator.d.ts.map