import { ApiKeyHeader, ApiKeyInfo, ApiKeyInfoProvider, AuthenticationHeader, AuthenticationInfo, IApiKeyInfoProvider, IAuthenticationInfoProvider } from 'rosmarin.ts'

@ApiKeyInfoProvider()
export class MyApiKeyInfoProvider implements IApiKeyInfoProvider {
    public async get(_apiKeyHeader: ApiKeyHeader): Promise<ApiKeyInfo> {
        const isValid: boolean = _apiKeyHeader.getApiKey('x-api-key') === 's3cr3t'
        return new ApiKeyInfo(isValid)
    }
}

export class MyAuthenticationInfoProvider implements IAuthenticationInfoProvider {
    public async get(_authHeader: AuthenticationHeader): Promise<AuthenticationInfo> {
        return new AuthenticationInfo()
    }
}