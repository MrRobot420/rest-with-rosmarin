"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = void 0;
const metadata_stores_1 = require("../../metadata-stores");
const santizieUrl_1 = require("../../router/santizieUrl");
const link = (href, rel, type) => {
    return (target, key) => {
        const link = {
            href: santizieUrl_1.sanitizeUrl(href),
            rel,
            type,
            property: key.toString(),
        };
        metadata_stores_1.modelMetadataStore.addLinkProperty(target.constructor, link);
    };
};
exports.link = link;
//# sourceMappingURL=links.decorator.js.map