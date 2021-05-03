import { IAuthenticationInfoProvider } from './authentication-info-provider';
import { AuthenticationInfo } from './authentication-info';
import { AuthenticationHeader } from './authentication-header';
export declare class NoAuthenticationInfoProvider implements IAuthenticationInfoProvider {
    get(_: AuthenticationHeader): Promise<AuthenticationInfo>;
}
//# sourceMappingURL=no-authentication-info-provider.d.ts.map