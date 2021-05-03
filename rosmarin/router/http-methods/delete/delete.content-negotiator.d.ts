import { CompiledRouteDefinition } from '../../route-definitions';
/**
 * @Delete() routes can be defined without a producing media type
 */
export declare class ContentNegotiator {
    private readonly routeDefinitions;
    private readonly mediaTypes;
    constructor(routeDefinitions: CompiledRouteDefinition[]);
    private findConflictingRoutes;
    retrieveHandler(accept?: string): CompiledRouteDefinition;
}
//# sourceMappingURL=delete.content-negotiator.d.ts.map