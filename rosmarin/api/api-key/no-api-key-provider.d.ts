import { IApiKeyInfoProvider } from './api-key-info-provider';
import { ApiKeyInfo } from './api-key-info';
import { ApiKeyHeader } from './api-key-header';
export declare class NoApiKeyProvider implements IApiKeyInfoProvider {
    get(_: ApiKeyHeader): Promise<ApiKeyInfo>;
}
//# sourceMappingURL=no-api-key-provider.d.ts.map