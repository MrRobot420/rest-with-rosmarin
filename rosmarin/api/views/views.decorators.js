"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionView = exports.view = exports.viewProp = exports.viewArrayProp = void 0;
const class_transformer_1 = require("class-transformer");
const metadata_stores_1 = require("../../metadata-stores");
const viewArrayProp = (typeFn, schemaOptions = {}) => (target, propertyKey) => {
    Reflect.decorate([class_transformer_1.Type(typeFn)], target, propertyKey);
    metadata_stores_1.viewMetadataStore.addProperty(target.constructor, {
        name: propertyKey.toString(),
        type: [].constructor,
        typeFn,
    });
    const validationProperty = {
        name: propertyKey.toString(),
        type: [].constructor,
        typeFn: typeFn,
        schemaOptions,
    };
    metadata_stores_1.validationMetadataStore.addProperty(target.constructor, validationProperty);
};
exports.viewArrayProp = viewArrayProp;
const viewProp = (schemaOptions = {}, typeFn) => (target, propertyKey) => {
    const reflectedType = Reflect.getMetadata('design:type', target, propertyKey);
    Reflect.decorate([class_transformer_1.Type(typeFn)], target, propertyKey);
    metadata_stores_1.viewMetadataStore.addProperty(target.constructor, {
        name: propertyKey.toString(),
        typeFn: typeFn,
        type: reflectedType,
    });
    metadata_stores_1.validationMetadataStore.addProperty(target.constructor, {
        name: propertyKey.toString(),
        typeFn: typeFn,
        type: reflectedType,
        schemaOptions,
    });
};
exports.viewProp = viewProp;
const view = (schemaOptions) => {
    return (target) => metadata_stores_1.validationMetadataStore.addSchemaForView(target, schemaOptions);
};
exports.view = view;
const collectionView = (schemaOptions = {}) => {
    return (target) => {
        metadata_stores_1.validationMetadataStore.addSchemaForCollectionView(target, schemaOptions);
    };
};
exports.collectionView = collectionView;
//# sourceMappingURL=views.decorators.js.map