import { ApiKeyHeader, ApiKeyInfo, ApiKeyInfoProvider, IApiKeyInfoProvider } from 'rosmarin.ts'

@ApiKeyInfoProvider()
export class MyApiKeyInfoProvider implements IApiKeyInfoProvider {
    public async get(_apiKeyHeader: ApiKeyHeader): Promise<ApiKeyInfo> {
        const isValid: boolean = _apiKeyHeader.getApiKey('x-api-key') === 's3cr3t'
        return new ApiKeyInfo(isValid)
    }
}