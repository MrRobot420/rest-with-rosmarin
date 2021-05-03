"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMetadataStore = exports.ValidationMetadataStore = void 0;
const abstract_property_store_1 = require("../abstract-property-store");
/**
 * Currently does not support inheritance
 */
class ValidationMetadataStore extends abstract_property_store_1.AbstractPropertyStore {
    constructor() {
        super(...arguments);
        this.viewSchemaOptions = new Map();
        this.collectionViewSchemaOptions = new Map();
    }
    addSchemaForView(ctor, schemaOptions) {
        this.viewSchemaOptions.set(ctor, schemaOptions);
    }
    getSchemaForView(ctor) {
        return this.viewSchemaOptions.get(ctor);
    }
    addSchemaForCollectionView(ctor, schemaOptions) {
        this.collectionViewSchemaOptions.set(ctor, schemaOptions);
    }
    getSchemaForCollectionView(ctor) {
        return this.collectionViewSchemaOptions.get(ctor);
    }
}
exports.ValidationMetadataStore = ValidationMetadataStore;
exports.validationMetadataStore = new ValidationMetadataStore();
//# sourceMappingURL=validation.store.js.map