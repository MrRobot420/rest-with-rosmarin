import { FastifyRequest } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { RawRequestDefaultExpression, RawServerBase, RawServerDefault } from 'fastify/types/utils';
/**
 * Use HttpRequest instead of FastifyRequest to have a clean interface for improvements in the future
 */
export interface HttpRequest<RouteGeneric extends RouteGenericInterface = RouteGenericInterface, RawServer extends RawServerBase = RawServerDefault, RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>> extends FastifyRequest<RouteGeneric, RawServer, RawRequest> {
}
//# sourceMappingURL=http-request.d.ts.map