"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractStateWithCaching = void 0;
const abstract_state_1 = require("./abstract-state");
const caching_1 = require("../caching");
class AbstractStateWithCaching extends abstract_state_1.AbstractState {
    constructor() {
        super();
        this._maxAgeInSeconds = 0;
        this._sMaxAgeInSeconds = 0;
        this.cachingType = caching_1.CachingType.DEACTIVATE_CACHE;
        this.cacheControlConfigurationSet =
            AbstractStateWithCaching.DEFAULT_CACHE_CONTROL_CONFIGURATION;
    }
    get maxAgeInSeconds() {
        return this._maxAgeInSeconds;
    }
    set maxAgeInSeconds(value) {
        this._maxAgeInSeconds = value < 0 ? 0 : value;
    }
    get sMaxAgeInSeconds() {
        return this._sMaxAgeInSeconds;
    }
    set sMaxAgeInSeconds(value) {
        this._sMaxAgeInSeconds = value < 0 ? 0 : value;
    }
    defineModelForCaching(model) {
        this.modelForCaching = model;
    }
    setHttpCachingType(cachingType, ...cacheControlConfigurations) {
        this.cachingType = cachingType;
        if ((cacheControlConfigurations === null || cacheControlConfigurations === void 0 ? void 0 : cacheControlConfigurations.length) > 0) {
            this.cacheControlConfigurationSet = new Set(cacheControlConfigurations);
        }
        else {
            this.cacheControlConfigurationSet =
                AbstractStateWithCaching.DEFAULT_CACHE_CONTROL_CONFIGURATION;
        }
    }
    defineHttpCaching() {
        switch (this.cachingType) {
            case caching_1.CachingType.DEACTIVATE_CACHE: {
                this.defineHttpCachingByDeactivatingCache();
                break;
            }
            case caching_1.CachingType.EXPIRES_TIME: {
                this.defineHttpCacheControl();
                break;
            }
            case caching_1.CachingType.VALIDATION_ETAG: {
                this.defineHttpCacheControl();
                this.defineHttpCachingByEtag();
                break;
            }
            case caching_1.CachingType.VALIDATION_TIMESTAMP: {
                this.defineHttpCacheControl();
                this.defineHttpCachingByValidationTimeStamp();
                break;
            }
        }
    }
    defineHttpCachingByDeactivatingCache() {
        this.response.cacheControl(caching_1.CacheControl.deactivateCaching());
    }
    defineHttpCacheControl() {
        const cacheControl = new caching_1.CacheControl();
        if (!this.isCacheNoCache() && !this.isCacheNoStore()) {
            cacheControl.maxAge = this._maxAgeInSeconds;
            if (!this.isCachePrivate()) {
                cacheControl.sMaxAge = this._sMaxAgeInSeconds;
            }
        }
        cacheControl.private = this.isCachePrivate();
        cacheControl.noStore = this.isCacheNoStore();
        cacheControl.noCache = this.isCacheNoCache();
        cacheControl.mustRevalidate = this.isCacheMustRevalidate();
        this.response.cacheControl(cacheControl);
    }
    isCachePrivate() {
        return this.cacheControlConfigurationSet.has(caching_1.CacheControlConfiguration.PRIVATE);
    }
    isCacheNoStore() {
        return this.cacheControlConfigurationSet.has(caching_1.CacheControlConfiguration.NO_STORE);
    }
    isCacheMustRevalidate() {
        return this.cacheControlConfigurationSet.has(caching_1.CacheControlConfiguration.MUST_REVALIDATE);
    }
    isCacheNoCache() {
        return this.cacheControlConfigurationSet.has(caching_1.CacheControlConfiguration.NO_CACHE);
    }
    defineHttpCachingByValidationTimeStamp() {
        this.response.lastModified(new Date(this.modelForCaching.lastModifiedAt));
    }
    defineHttpCachingByEtag() {
        this.response.etag(this.createEntityTagOfResult());
    }
    createEntityTagOfResult(model) {
        return this.createEtag(model !== null && model !== void 0 ? model : this.modelForCaching);
    }
    /**
     * Override this method to create etag in another way
     */
    createEtag(model) {
        return caching_1.createEtag(model !== null && model !== void 0 ? model : this.modelForCaching);
    }
}
exports.AbstractStateWithCaching = AbstractStateWithCaching;
AbstractStateWithCaching.DEFAULT_CACHE_CONTROL_CONFIGURATION = new Set([
    caching_1.CacheControlConfiguration.NO_CACHE,
    caching_1.CacheControlConfiguration.NO_STORE,
]);
//# sourceMappingURL=abstract-state-with-caching.js.map