import { CompiledRouteDefinition } from './route-definitions';
import { RouteHandlerMethod } from 'fastify/types/route';
import { HttpMethod } from './http-methods';
/**
 * Custom HTTP methods like LINK could be possible when https://github.com/delvedor/find-my-way/pull/178 lands
 */
export declare const createRouteHandler: (routeDefinitions: CompiledRouteDefinition[], controller: unknown, httpMethod: HttpMethod) => RouteHandlerMethod;
//# sourceMappingURL=route-handler.d.ts.map