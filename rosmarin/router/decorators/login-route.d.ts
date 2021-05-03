import { LoginState } from '../../api/states/login-state';
import { TypedMethodDecorator } from '../types';
export interface LoginRouteDefinition {
    path?: string;
}
export declare const Login: (routeDefinition?: LoginRouteDefinition) => TypedMethodDecorator<LoginState>;
//# sourceMappingURL=login-route.d.ts.map