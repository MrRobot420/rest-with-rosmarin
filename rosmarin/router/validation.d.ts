import { JsonSchema, JsonSchemaAndTransformer, ValidatorAndTransformer } from './route-definitions';
import Ajv, { ValidateFunction } from 'ajv';
import { Constructor } from '../types';
import { FastifyRequest } from 'fastify';
import { AbstractViewModel } from '../models';
declare const ajv: Ajv.Ajv;
export declare const validate: (req: FastifyRequest, toValidate: 'body' | 'params' | 'query', validationFn: ValidateFunction) => void;
export declare const validateAndTransform: (req: FastifyRequest, validatorAndTransformer: ValidatorAndTransformer) => void;
export declare const buildValidatorAndTransformer: <T extends AbstractViewModel>(ctor: Constructor<T>) => JsonSchemaAndTransformer | undefined;
export declare const compileSchema: (schema?: JsonSchema) => ValidateFunction | undefined;
export default ajv;
//# sourceMappingURL=validation.d.ts.map