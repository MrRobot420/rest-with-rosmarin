"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPropertyStore = void 0;
/**
 * We take the overhead at build time to avoid the time-consuming search for properties in all super classes at runtime.
 */
class AbstractPropertyStore {
    constructor() {
        this.properties = new Map();
    }
    addProperty(ctor, property) {
        if (this.properties.has(ctor) === false) {
            this.properties.set(ctor, []);
        }
        this.searchInSuperClasses(ctor, this.properties.get(ctor));
        this.addPropertyInternal(ctor, property);
    }
    addPropertyInternal(ctor, property) {
        const currentProperties = this.properties.get(ctor);
        const idx = currentProperties.findIndex((prop) => prop.name === property.name);
        if (idx < 0) {
            currentProperties.push(property);
        }
        else {
            currentProperties[idx] = property;
        }
    }
    getProperties(ctor) {
        var _a;
        const properties = this.properties.get(ctor);
        return properties
            ? properties
            : (_a = this.properties.get(Object.getPrototypeOf(ctor))) !== null && _a !== void 0 ? _a : [];
    }
    getPropertyType(ctor, propertyName) {
        const properties = this.getProperties(ctor);
        const property = properties.find((prop) => prop.name === propertyName);
        let type;
        if (typeof property !== 'undefined') {
            if (typeof property.typeFn !== 'undefined') {
                type = property.typeFn();
            }
            else {
                type = property.type;
            }
        }
        // Maybe the user did not annotate the property with the @modelProp annotation but with another one so we can receive metadata for it
        if (typeof type === 'undefined') {
            type = Reflect.getMetadata('design:type', new ctor(), propertyName);
        }
        return type;
    }
    getProperty(ctor, propertyName) {
        return this.getProperties(ctor).find((prop) => prop.name === propertyName);
    }
    getArrayProperties(ctor) {
        return this.getProperties(ctor).filter((prop) => prop.type.name === 'Array');
    }
    isArrayProperty(ctor, propertyName) {
        return this.getArrayProperties(ctor).some((prop) => prop.name === propertyName);
    }
    searchInSuperClasses(ctor, data) {
        var _a;
        const prototype = Object.getPrototypeOf(ctor);
        const prototypeProperties = (_a = this.properties.get(prototype)) !== null && _a !== void 0 ? _a : [];
        // Add property only if a property with the same name does not exist
        // if a property has been overridden in an inheritance hierarchy, we take the property definition furthest down the hierarchy
        prototypeProperties
            .filter((property) => typeof data.find((prop) => prop.name === property.name) ===
            'undefined')
            .forEach((property) => data.push(property));
        // if prototype is function or object it is no longer a class created by
        // the user and the recursion should be terminated
        if (prototype.constructor.name === 'Function' ||
            prototype.constructor.name === 'Object')
            return;
        this.searchInSuperClasses(prototype, data);
    }
}
exports.AbstractPropertyStore = AbstractPropertyStore;
//# sourceMappingURL=abstract-property-store.js.map