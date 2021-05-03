import { HttpRequest } from './http-request';
import { HttpResponse } from './http-response';
import { Configured } from '../api';
import { Target } from '../types';
import { HttpMethod } from './http-methods';
import { FullRouteDefinition } from './route-definitions';
export declare type TypedMethodDecorator<T> = (target: Target, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>;
export declare type ReturnsConfiguredState<State> = (request: HttpRequest, response: HttpResponse) => Configured<State>;
export declare type RouteStore = Record<string, Record<HttpMethod, FullRouteDefinition[]>>;
//# sourceMappingURL=types.d.ts.map