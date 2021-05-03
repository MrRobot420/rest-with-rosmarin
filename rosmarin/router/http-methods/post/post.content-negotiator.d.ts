import { CompiledRouteDefinition } from '../../route-definitions';
/**
 * This content negotiator assumes that the response payload of a POST request is empty.
 */
export declare class ContentNegotiator {
    private readonly routeDefinitions;
    private readonly mediaTypes;
    constructor(routeDefinitions: CompiledRouteDefinition[]);
    private findConflictingRoutes;
    /**
     * If no Content-Type header is provided, rosmarin DOES assume that the content type is "application/octet-stream"
     * as suggested in https://tools.ietf.org/html/rfc7231#section-3.1.1.5.
     */
    retrieveHandler(contentType?: string): CompiledRouteDefinition;
}
//# sourceMappingURL=post.content-negotiator.d.ts.map