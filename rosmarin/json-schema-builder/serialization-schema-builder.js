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
exports.buildSerializationSchema = void 0;
const utils_1 = require("./utils");
const metadata_stores_1 = require("../metadata-stores");
const linkSchema = {
    type: 'object',
    properties: {
        href: {
            type: 'string',
        },
        rel: {
            type: 'string',
        },
        type: {
            type: 'string',
        },
    },
    required: ['href', 'rel'],
    additionalProperties: false,
};
const buildCollectionSchema = (model, view, schemaOptions) => {
    const arraySchema = {
        type: 'array',
        items: buildObjectSchema(model, view),
    };
    return Object.assign(Object.assign({}, arraySchema), schemaOptions);
};
const buildArrayPropertySchema = (model, view, propertyName, schemaOptions) => {
    const type = metadata_stores_1.viewMetadataStore.getPropertyType(view, propertyName);
    let items;
    // TODO: support nested arrays
    if (utils_1.isObject(type)) {
        items = buildObjectSchema(model, type);
    }
    else {
        items = { type: type.name.toLowerCase() };
    }
    const arraySchema = {
        type: 'array',
        items,
    };
    return Object.assign(Object.assign({}, arraySchema), schemaOptions);
};
const buildObjectSchema = (model, view) => {
    const validationProperties = metadata_stores_1.validationMetadataStore.getProperties(view);
    const schemaOptions = metadata_stores_1.validationMetadataStore.getSchemaForView(view);
    const linkProperties = metadata_stores_1.modelMetadataStore.getLinkProperties(model);
    const objectSchema = {
        type: 'object',
        properties: {},
        required: [],
        additionalProperties: false,
    };
    for (const linkProp of linkProperties) {
        objectSchema.required.push(linkProp.property);
        objectSchema.properties[linkProp.property] = linkSchema;
    }
    for (const prop of validationProperties) {
        const _a = prop.schemaOptions, { required } = _a, options = __rest(_a, ["required"]);
        if ((typeof required === 'undefined' || required === true) &&
            objectSchema.required.includes(prop.name) === false) {
            objectSchema.required.push(prop.name);
        }
        const type = utils_1.typeOfProperty(prop);
        if (Object.keys(prop.schemaOptions).length !== 0) {
            objectSchema.properties[prop.name] = options;
        }
        else if (utils_1.isArray(prop.type)) {
            const TypeInModel = metadata_stores_1.modelMetadataStore.getPropertyType(model, prop.name);
            objectSchema.properties[prop.name] = buildArrayPropertySchema(TypeInModel, view, prop.name, prop.schemaOptions);
        }
        else if (utils_1.isObject(type)) {
            const TypeInModel = metadata_stores_1.modelMetadataStore.getPropertyType(model, prop.name);
            objectSchema.properties[prop.name] = buildObjectSchema(TypeInModel, type);
        }
        else {
            objectSchema.properties[prop.name] = utils_1.mergePropertyOptions(type, prop.schemaOptions);
        }
    }
    return Object.assign(Object.assign({}, objectSchema), schemaOptions);
};
const buildSerializationSchema = (from, to) => {
    const schemaOptions = metadata_stores_1.validationMetadataStore.getSchemaForCollectionView(to);
    // Schema is an object or an array. If a view class is annotated with @collectionView we assume that the user want to
    // send an JSON array with the annotated class as item type
    if (typeof schemaOptions !== 'undefined') {
        return buildCollectionSchema(from, to, schemaOptions);
    }
    else {
        return buildObjectSchema(from, to);
    }
};
exports.buildSerializationSchema = buildSerializationSchema;
//# sourceMappingURL=serialization-schema-builder.js.map