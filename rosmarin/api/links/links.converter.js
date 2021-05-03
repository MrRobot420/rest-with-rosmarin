"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLinks = void 0;
const metadata_stores_1 = require("../../metadata-stores");
const convertLinksInObject = (instance, url) => {
    if (typeof instance === 'undefined')
        return instance;
    const model = instance;
    const linkProperties = metadata_stores_1.modelMetadataStore.getLinkProperties(model.constructor);
    linkProperties.forEach((prop) => {
        let href = prop.href.replace(/{.*?}/g, (substring) => model[substring.substring(1, substring.length - 1)]);
        href = url + href;
        model[prop.property] = {
            href,
            type: prop.type,
            rel: prop.rel,
        };
    });
    const modelProperties = metadata_stores_1.modelMetadataStore.getProperties(model.constructor);
    for (const prop of modelProperties) {
        if (Array.isArray(model[prop.name])) {
            for (let arrayProp of model[prop.name]) {
                arrayProp = convertLinks(arrayProp, url);
            }
        }
        else if (typeof model[prop.name] === 'object') {
            model[prop.name] = convertLinks(model[prop.name], url);
        }
        else {
            /* property has a primitive type a cannot be converted */
        }
    }
    return instance;
};
function convertLinks(instances, url) {
    if (Array.isArray(instances)) {
        for (let instance of instances) {
            instance = convertLinksInObject(instance, url);
        }
        return instances;
    }
    else {
        return convertLinksInObject(instances, url);
    }
}
exports.convertLinks = convertLinks;
//# sourceMappingURL=links.converter.js.map