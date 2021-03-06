import { FullRouteDefinition } from '../route-definitions';
import { TypedMethodDecorator } from '../types';
/**
 * This method/decorator gives the user the possibility to define arbitrary controller routes. However, it is strongly
 * recommended not to use this method, as it is possible to define non-HTTP and REST compliant routes with this method.
 *
 * PLEASE use the HTTP method specific methods/decorators.
 */
export declare const Route: (routeDefinition: Omit<FullRouteDefinition, 'method'>) => TypedMethodDecorator<any>;
//# sourceMappingURL=route.d.ts.map