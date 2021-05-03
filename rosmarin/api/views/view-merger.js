"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.isConstructorOfPrimitiveValue = void 0;
const metadata_stores_1 = require("../../metadata-stores");
const pino_1 = __importDefault(require("pino"));
const isPrimitiveValue = (value) => (typeof value !== 'object' && typeof value !== 'function') || value === null;
const shouldMergeProperty = (propertyName) => propertyName !== 'id' && propertyName !== 'lastModifiedAt';
const deletePropertyInObject = (object, key) => {
    object[key] = undefined;
};
const isConstructorOfPrimitiveValue = (ctor) => {
    return (ctor.name.toLowerCase() === 'string' ||
        ctor.name.toLowerCase() === 'number' ||
        ctor.name.toLowerCase() === 'bigint ' ||
        ctor.name.toLowerCase() === 'boolean');
};
exports.isConstructorOfPrimitiveValue = isConstructorOfPrimitiveValue;
const copyFromSourceToTarget = (source, target, key) => {
    target[key] = source[key];
};
// wow this is messy and someone should refactor this
const merge = (source, target, logger = pino_1.default({ prettyPrint: true, level: 'info' })) => {
    try {
        const sourceProperties = metadata_stores_1.viewMetadataStore.getProperties(source.constructor);
        for (const sourceProperty of sourceProperties) {
            const propertyName = sourceProperty.name;
            if (shouldMergeProperty(propertyName) === false) {
                continue;
            }
            const propertyValueInSource = source[propertyName];
            if (typeof propertyValueInSource === 'undefined') {
                logger.trace(`DELETE property "${sourceProperty.name}" in model "${target.constructor.name}".`);
                deletePropertyInObject(target, propertyName);
            }
            else if (isPrimitiveValue(propertyValueInSource)) {
                logger.trace(`COPY property "${sourceProperty.name}" from view "${source.constructor.name}" in model "${target.constructor.name}".`);
                copyFromSourceToTarget(source, target, propertyName);
            }
            else if (typeof propertyValueInSource === 'object') {
                // is embedded collection resource?
                if (Array.isArray(propertyValueInSource)) {
                    logger.trace('Identified embedded collection resource.');
                    // Array is not initialized in target
                    if (Array.isArray(target[propertyName]) === false) {
                        ;
                        target[propertyName] = [];
                    }
                    const propertyValueInTarget = target[propertyName];
                    let constructor = metadata_stores_1.modelMetadataStore.getPropertyType(target.constructor, propertyName);
                    if (typeof constructor === 'undefined') {
                        logger.warn(`ViewMerger cannot determine the type of the embedded collection resource "${propertyName}" in model "${target.constructor.name}". ` +
                            `An attempt is made to find out the type via existing resources in the model. This is undesirable behavior and should be fixed. ` +
                            `Did you annotate the property with @arrayModelProp(() => type)?`);
                        if (target[propertyName].length > 0) {
                            constructor = target[propertyName][0].constructor;
                            logger.trace(`Type "${constructor.name}" is determined and set as type of the embedded collection resource.`);
                        }
                        else {
                            logger.trace('The type cannot be determined. Please fix this issue. Any resource in the view that cannot be found in the model is skipped.');
                        }
                    }
                    else if (exports.isConstructorOfPrimitiveValue(constructor)) {
                        ;
                        target[propertyName] = source[propertyName];
                    }
                    else {
                        for (const resource of propertyValueInSource) {
                            const resourceId = resource.id;
                            // check if this resource also exists in the target model
                            const found = propertyValueInTarget.find((value) => value.id == resourceId); // TODO how should we search for this?
                            // if it does not exist we have to instantiate it
                            if (typeof found === 'undefined' &&
                                typeof constructor !== 'undefined') {
                                const newInstance = new constructor();
                                target[propertyName].push(newInstance);
                                exports.merge(resource, newInstance);
                            }
                            else if (typeof found !== 'undefined') {
                                exports.merge(resource, found);
                            }
                            else {
                                logger.trace(`Resource in view ${source.constructor.name}${resourceId ? ' with ID ' + resourceId : ''} is skipped.`);
                            }
                        }
                        for (let i = 0; i < propertyValueInTarget.length; i++) {
                            const resourceId = propertyValueInTarget[i].id;
                            if (typeof propertyValueInSource.find((e) => e.id == resourceId) ===
                                'undefined') {
                                propertyValueInTarget.splice(i, 1);
                            }
                        }
                    }
                    // copyFromSourceToTarget(source, target, propertyName)
                }
                else {
                    // object property is not set in the target model and has to be instantiated
                    if (typeof target[propertyName] === 'undefined') {
                        logger.trace(`Embedded resource "${propertyName}" is undefined in target model "${target.constructor.name}" and must be initialized.`);
                        // to do this we need the type of this property in the target model
                        const constructor = metadata_stores_1.modelMetadataStore.getPropertyType(target.constructor, propertyName);
                        if (typeof constructor === 'undefined') {
                            logger.warn(`ViewMerger cannot determine the type of the embedded resource "${propertyName}" of model "${target.constructor.name}". ` +
                                `A plain javascript object will be used instead. This is not intended and may result in undefined behavior. ` +
                                `Did you annotate the property with @modelProp?`);
                            target[propertyName] = {};
                        }
                        else {
                            ;
                            target[propertyName] = new constructor();
                        }
                        // normally the 'id' attribute is ignored but should be set here
                        copyFromSourceToTarget(source[propertyName], target[propertyName], 'id');
                    }
                    // then just continue to merge
                    exports.merge(source[propertyName], target[propertyName]);
                }
            }
            else {
                /* type of property is function and is ignored */
                logger.trace(`Property "${propertyName}" in view "${source.constructor.name}" has type "function" and is ignored.`);
            }
        }
        return target;
    }
    catch (e) {
        logger.error(`An unexpected error occurred while merging the view "${source.constructor.name}" in the model "${target.constructor.name}". The model merged this far is returned. ${e.stack}`);
        return target;
    }
};
exports.merge = merge;
//# sourceMappingURL=view-merger.js.map