/**
 * See https://tools.ietf.org/html/rfc7234#section-5.2
 */
export declare class CacheControl {
    public: boolean;
    private: boolean;
    mustRevalidate: boolean;
    noCache: boolean;
    noStore: boolean;
    noTransform: boolean;
    private _maxAge;
    private _sMaxAge;
    get MaxAge(): number;
    set maxAge(maxAge: number);
    get sMaxAge(): number;
    set sMaxAge(sMaxAge: number);
    static deactivateCaching(): CacheControl;
    static cacheForEver(): CacheControl;
    toString(): string;
}
//# sourceMappingURL=cache-control.d.ts.map