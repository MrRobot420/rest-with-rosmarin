"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOfProperty = exports.mergePropertyOptions = exports.isArray = exports.isObject = void 0;
const isObject = (type) => {
    var _a;
    const typeName = (_a = type === null || type === void 0 ? void 0 : type.name) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    return (typeName !== 'string' &&
        typeName !== 'boolean' &&
        typeName !== 'number' &&
        typeName !== 'bigint' &&
        typeName !== 'boolean' &&
        typeName !== 'symbol' &&
        typeName !== 'object' &&
        typeName !== 'function' &&
        !exports.isArray(type));
};
exports.isObject = isObject;
const isArray = (type) => (type === null || type === void 0 ? void 0 : type.name) === 'Array';
exports.isArray = isArray;
const mergePropertyOptions = (type, options) => {
    const mergedResult = Object.assign({ type: type.name.toLowerCase() }, options);
    delete mergedResult.required;
    return mergedResult;
};
exports.mergePropertyOptions = mergePropertyOptions;
const typeOfProperty = (property) => {
    if (typeof property.typeFn === 'function')
        return property.typeFn();
    return property.type;
};
exports.typeOfProperty = typeOfProperty;
//# sourceMappingURL=utils.js.map