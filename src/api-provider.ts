import { ApiKeyHeader, ApiKeyInfo, ApiKeyInfoProvider, IApiKeyInfoProvider } from 'rosmarin.ts'

@ApiKeyInfoProvider()
export class MyApiKeyProvider implements IApiKeyInfoProvider {
    public async get(_apiKeyHeader: ApiKeyHeader): Promise<ApiKeyInfo> {
        return new ApiKeyInfo(true)
    }
}