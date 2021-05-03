import { ApplicationConfig } from './application-config';
import { Constructor } from './types';
import { IApiKeyInfoProvider, IAuthenticationInfoProvider } from './api';
export declare class RestApplication {
    private router;
    private readonly logger;
    private readonly controllers;
    constructor(config?: ApplicationConfig);
    private determineLoggingOptions;
    private configureContainer;
    registerApiKeyInfoProvider(provider: Constructor<IApiKeyInfoProvider>): void;
    registerAuthenticationInfoProvider(provider: Constructor<IAuthenticationInfoProvider>): void;
    registerController(...controllers: Constructor[]): void;
    start(port?: number, host?: string): Promise<void>;
}
//# sourceMappingURL=rest-application.d.ts.map