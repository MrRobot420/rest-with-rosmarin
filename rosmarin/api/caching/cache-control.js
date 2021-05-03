"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheControl = void 0;
/**
 * See https://tools.ietf.org/html/rfc7234#section-5.2
 */
class CacheControl {
    constructor() {
        this.public = false;
        this.private = false;
        this.mustRevalidate = false;
        this.noCache = false;
        this.noStore = false;
        this.noTransform = false;
        this._maxAge = 0;
        this._sMaxAge = 0;
    }
    get MaxAge() {
        return this._sMaxAge;
    }
    set maxAge(maxAge) {
        this._maxAge = maxAge < 0 ? 0 : maxAge;
    }
    get sMaxAge() {
        return this._sMaxAge;
    }
    set sMaxAge(sMaxAge) {
        this._sMaxAge = sMaxAge < 0 ? 0 : sMaxAge;
    }
    static deactivateCaching() {
        const cacheControl = new CacheControl();
        cacheControl.noTransform = true;
        cacheControl.noStore = true;
        cacheControl.noCache = true;
        return cacheControl;
    }
    static cacheForEver() {
        const cacheControl = new CacheControl();
        cacheControl.maxAge = 31536000;
        return cacheControl;
    }
    toString() {
        const values = [];
        if (this.public)
            values.push('public');
        if (this.private)
            values.push('private');
        if (this.mustRevalidate)
            values.push('must-revalidate');
        if (this.noCache)
            values.push('no-cache');
        if (this.noStore)
            values.push('no-store');
        if (this.noTransform)
            values.push('no-transform');
        if (this._maxAge)
            values.push(`max-age=${this._maxAge}`);
        if (this._sMaxAge)
            values.push(`s-maxage=${this._sMaxAge}`);
        return values.join(', ');
    }
}
exports.CacheControl = CacheControl;
//# sourceMappingURL=cache-control.js.map