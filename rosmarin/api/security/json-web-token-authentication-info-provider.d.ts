import { IAuthenticationInfoProvider } from './authentication-info-provider';
import { AuthenticationInfo } from './authentication-info';
import { AuthenticationHeader } from './authentication-header';
import { IUserRepository } from '../../database/repositories/user.repository';
export declare class JsonWebTokenAuthenticationInfoProvider implements IAuthenticationInfoProvider {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    get(authenticationHeader: AuthenticationHeader): Promise<AuthenticationInfo>;
}
//# sourceMappingURL=json-web-token-authentication-info-provider.d.ts.map