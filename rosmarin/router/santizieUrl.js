"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUrl = void 0;
const sanitizeUrl = (url) => {
    return ('/' +
        url
            .split(/\//g)
            .filter((s) => s)
            .join('/'));
};
exports.sanitizeUrl = sanitizeUrl;
//# sourceMappingURL=santizieUrl.js.map