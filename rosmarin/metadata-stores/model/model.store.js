"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelMetadataStore = exports.ModelMetadataStore = void 0;
const abstract_property_store_1 = require("../abstract-property-store");
/**
 * Link properties does not support inheritance
 */
class ModelMetadataStore extends abstract_property_store_1.AbstractPropertyStore {
    constructor() {
        super(...arguments);
        this.links = new Map();
    }
    addLinkProperty(ctor, link) {
        if (this.links.has(ctor) === false) {
            this.links.set(ctor, []);
        }
        this.links.get(ctor).push(link);
    }
    getLinkProperties(ctor) {
        var _a;
        return (_a = this.links.get(ctor)) !== null && _a !== void 0 ? _a : [];
    }
    isLinkProperty(ctor, propertyName) {
        return this.getLinkProperties(ctor).find((linkProperty) => linkProperty.property === propertyName);
    }
}
exports.ModelMetadataStore = ModelMetadataStore;
exports.modelMetadataStore = new ModelMetadataStore();
//# sourceMappingURL=model.store.js.map