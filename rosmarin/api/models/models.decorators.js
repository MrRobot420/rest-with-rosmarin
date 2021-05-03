"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelArrayProp = exports.modelProp = void 0;
const metadata_stores_1 = require("../../metadata-stores");
const modelProp = (typeFn) => {
    return (target, propertyKey) => {
        const reflectedType = Reflect.getMetadata('design:type', target, propertyKey);
        metadata_stores_1.modelMetadataStore.addProperty(target.constructor, {
            name: propertyKey.toString(),
            typeFn,
            type: reflectedType,
        });
    };
};
exports.modelProp = modelProp;
const modelArrayProp = (typeFn) => {
    return (target, propertyKey) => {
        metadata_stores_1.modelMetadataStore.addProperty(target.constructor, {
            name: propertyKey.toString(),
            type: [].constructor,
            typeFn,
        });
    };
};
exports.modelArrayProp = modelArrayProp;
//# sourceMappingURL=models.decorators.js.map