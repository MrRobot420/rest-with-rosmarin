"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSchema = exports.buildValidatorAndTransformer = exports.validateAndTransform = exports.validate = void 0;
const ajv_1 = __importDefault(require("ajv"));
const router_error_1 = require("./errors/router-error");
const class_transformer_1 = require("class-transformer");
const json_schema_builder_1 = require("../json-schema-builder");
const ajv = new ajv_1.default({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    nullable: true,
});
const validate = (req, toValidate, validationFn) => {
    if (typeof validationFn === 'undefined')
        return;
    const isValid = validationFn(req[toValidate]);
    if (!isValid)
        throw new router_error_1.RouterError(422, 'Unprocessable Entity', `Validation of the request ${toValidate} failed.`);
};
exports.validate = validate;
const validateAndTransform = (req, validatorAndTransformer) => {
    if (typeof (validatorAndTransformer === null || validatorAndTransformer === void 0 ? void 0 : validatorAndTransformer.transformationFn) === 'undefined' ||
        typeof (validatorAndTransformer === null || validatorAndTransformer === void 0 ? void 0 : validatorAndTransformer.validationFn) !== 'function')
        return;
    const isValid = validatorAndTransformer.validationFn(req.body);
    if (!isValid)
        throw new router_error_1.RouterError(422, 'Unprocessable Entity', `Validation of the request body failed.`);
    req.body = validatorAndTransformer.transformationFn(req.body);
};
exports.validateAndTransform = validateAndTransform;
const buildValidatorAndTransformer = (ctor) => {
    if (typeof ctor === 'undefined')
        return undefined;
    const schema = json_schema_builder_1.buildValidationSchema(ctor);
    return {
        schema,
        transformer: (plain) => class_transformer_1.plainToClass(ctor, plain), // TODO: replace class-transformer
    };
};
exports.buildValidatorAndTransformer = buildValidatorAndTransformer;
const compileSchema = (schema) => {
    return typeof schema === 'undefined' ? undefined : ajv.compile(schema);
};
exports.compileSchema = compileSchema;
exports.default = ajv;
//# sourceMappingURL=validation.js.map