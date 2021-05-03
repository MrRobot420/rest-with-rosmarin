"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildViewConverter = exports.serializeErrorResponse = void 0;
const fast_json_stringify_1 = __importDefault(require("fast-json-stringify"));
const serialization_schema_builder_1 = require("../json-schema-builder/serialization-schema-builder");
const serializeErrorFn = fast_json_stringify_1.default({
    type: 'object',
    properties: {
        status: {
            type: 'integer',
            minimum: 400,
            exclusiveMaximum: 600,
        },
        message: {
            type: 'string',
        },
        error: {
            type: 'string',
        },
        code: {
            anyOf: [{ type: 'string' }, { type: 'integer' }],
        },
    },
    required: ['status', 'message', 'error'],
    additionalProperties: false,
});
const serializeErrorResponse = (error) => serializeErrorFn(error);
exports.serializeErrorResponse = serializeErrorResponse;
const buildViewConverter = (from, to) => {
    if (typeof from === 'undefined' || typeof to === 'undefined')
        return undefined;
    return fast_json_stringify_1.default(serialization_schema_builder_1.buildSerializationSchema(from, to));
};
exports.buildViewConverter = buildViewConverter;
//# sourceMappingURL=serialization.js.map