import { Constructor } from '../../types';
import { ControllerMetadata } from './controller-metadata';
import { FullRouteDefinition } from '../../router/route-definitions';
export declare class RouterMetadataStore {
    private controllers;
    private routes;
    registerController<T>(ctor: Constructor<T>, metadata: ControllerMetadata): void;
    getController<T>(ctor: Constructor<T>): ControllerMetadata | undefined;
    addRoute<T>(ctor: Constructor<T>, routeDefinition: FullRouteDefinition): void;
    getRoutes<T>(ctor: Constructor<T>): FullRouteDefinition[];
    clear(): void;
}
export declare const routerMetadataStore: RouterMetadataStore;
//# sourceMappingURL=router.store.d.ts.map