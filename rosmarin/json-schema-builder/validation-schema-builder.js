"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildValidationSchema = exports.buildObjectSchema = exports.buildArrayPropertySchema = exports.buildCollectionSchema = void 0;
const utils_1 = require("./utils");
const metadata_stores_1 = require("../metadata-stores");
const buildCollectionSchema = (ctor, schemaOptions) => {
    const arraySchema = {
        type: 'array',
        items: exports.buildObjectSchema(ctor),
    };
    return Object.assign(Object.assign({}, arraySchema), schemaOptions);
};
exports.buildCollectionSchema = buildCollectionSchema;
const buildArrayPropertySchema = (ctor, propertyName) => {
    const type = metadata_stores_1.viewMetadataStore.getPropertyType(ctor, propertyName);
    let items;
    // TODO: check if TypeFn is undefined
    // TODO: support nested array
    if (utils_1.isObject(type)) {
        items = exports.buildObjectSchema(type);
    }
    else {
        items = { type: type.name.toLowerCase() };
    }
    return {
        type: 'array',
        items,
    };
};
exports.buildArrayPropertySchema = buildArrayPropertySchema;
const buildObjectSchema = (ctor) => {
    const validationProperties = metadata_stores_1.validationMetadataStore.getProperties(ctor);
    const schemaOptions = metadata_stores_1.validationMetadataStore.getSchemaForView(ctor);
    const objectSchema = {
        type: 'object',
        properties: {},
        required: [],
        additionalProperties: false,
    };
    for (const prop of validationProperties) {
        const _a = prop.schemaOptions, { required } = _a, options = __rest(_a, ["required"]);
        if (typeof required === 'undefined' || required === true) {
            objectSchema.required.push(prop.name);
        }
        const type = utils_1.typeOfProperty(prop);
        if (Object.keys(prop.schemaOptions).length !== 0) {
            objectSchema.properties[prop.name] = options;
        }
        else if (utils_1.isArray(prop.type)) {
            objectSchema.properties[prop.name] = exports.buildArrayPropertySchema(ctor, prop.name);
        }
        else if (utils_1.isObject(type)) {
            objectSchema.properties[prop.name] = exports.buildObjectSchema(type);
        }
        else {
            objectSchema.properties[prop.name] = { type: type.name.toLowerCase() };
        }
    }
    return Object.assign(Object.assign({}, objectSchema), schemaOptions);
};
exports.buildObjectSchema = buildObjectSchema;
const buildValidationSchema = (ctor) => {
    const schemaOptions = metadata_stores_1.validationMetadataStore.getSchemaForCollectionView(ctor);
    // Schema is an object or an array. If a view class is annotated with @collectionView we assume that the user want to
    // send an JSON array with the annotated class as item type
    if (typeof schemaOptions !== 'undefined') {
        return exports.buildCollectionSchema(ctor, schemaOptions);
    }
    else {
        return exports.buildObjectSchema(ctor);
    }
};
exports.buildValidationSchema = buildValidationSchema;
//# sourceMappingURL=validation-schema-builder.js.map