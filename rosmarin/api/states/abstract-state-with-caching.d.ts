import { AbstractState } from './abstract-state';
import { CacheControlConfiguration, CachingType } from '../caching';
import { AbstractModel } from '../../models';
export declare abstract class AbstractStateWithCaching extends AbstractState {
    protected static DEFAULT_CACHE_CONTROL_CONFIGURATION: Set<CacheControlConfiguration>;
    protected cachingType: CachingType;
    protected cacheControlConfigurationSet: Set<CacheControlConfiguration>;
    private _maxAgeInSeconds;
    private _sMaxAgeInSeconds;
    protected modelForCaching: AbstractModel;
    protected get maxAgeInSeconds(): number;
    protected set maxAgeInSeconds(value: number);
    protected get sMaxAgeInSeconds(): number;
    protected set sMaxAgeInSeconds(value: number);
    protected constructor();
    protected defineModelForCaching(model: AbstractModel): void;
    protected setHttpCachingType(cachingType: CachingType, ...cacheControlConfigurations: CacheControlConfiguration[]): void;
    protected defineHttpCaching(): void;
    private defineHttpCachingByDeactivatingCache;
    private defineHttpCacheControl;
    private isCachePrivate;
    private isCacheNoStore;
    private isCacheMustRevalidate;
    private isCacheNoCache;
    protected defineHttpCachingByValidationTimeStamp(): void;
    protected defineHttpCachingByEtag(): void;
    protected createEntityTagOfResult(): string;
    protected createEntityTagOfResult(model: AbstractModel): string;
    /**
     * Override this method to create etag in another way
     */
    protected createEtag(model?: AbstractModel): string;
}
//# sourceMappingURL=abstract-state-with-caching.d.ts.map