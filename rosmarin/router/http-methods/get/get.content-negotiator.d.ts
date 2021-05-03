import { CompiledRouteDefinition } from '../../route-definitions';
/**
 * If a route definition has no producing media type the default  media type "application/json" is set.
 */
export declare class ContentNegotiator {
    private readonly routeDefinitions;
    private readonly mediaTypes;
    constructor(routeDefinitions: CompiledRouteDefinition[]);
    private findConflictingRoutes;
    /**
     * If no Accept header is sent by the client implies that client accepts any media type
     * See https://tools.ietf.org/html/rfc7231#section-5.3.2
     */
    retrieveHandler(accept?: string): CompiledRouteDefinition;
}
//# sourceMappingURL=get.content-negotiator.d.ts.map