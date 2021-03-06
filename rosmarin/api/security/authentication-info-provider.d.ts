import { AuthenticationHeader } from './authentication-header';
import { AuthenticationInfo } from './authentication-info';
export interface IAuthenticationInfoProvider {
    get(authenticationHeader: AuthenticationHeader): Promise<AuthenticationInfo>;
}
//# sourceMappingURL=authentication-info-provider.d.ts.map