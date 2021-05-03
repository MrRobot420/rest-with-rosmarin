"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLink = exports.linkHeader = void 0;
const linkHeader = (uri, rel, mediaType) => {
    return mediaType
        ? `<${uri}>;rel="${rel}";type="${mediaType}"`
        : `<${uri}>;rel="${rel}";`;
};
exports.linkHeader = linkHeader;
const buildLink = (uriTemplate, relType, mediaTypeOrParams, params) => {
    if (Array.isArray(mediaTypeOrParams)) {
        params = mediaTypeOrParams;
        mediaTypeOrParams = undefined;
    }
    let link = uriTemplate;
    if ((params === null || params === void 0 ? void 0 : params.length) > 0) {
        let counter = 0;
        link = uriTemplate.replace(/\{.*?\}/g, (_) => String(params[counter++]));
    }
    return exports.linkHeader(link, relType, mediaTypeOrParams);
};
exports.buildLink = buildLink;
//# sourceMappingURL=links.builder.js.map