import { ApiKeyHeader, ApiKeyInfo, IApiKeyInfoProvider } from '../api';
export declare class ApiKeyProvider implements IApiKeyInfoProvider {
    get(apiKeyHeader: ApiKeyHeader): Promise<ApiKeyInfo>;
}
//# sourceMappingURL=auth.d.ts.map