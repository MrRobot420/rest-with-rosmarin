import { Constructor } from '../types';
import { SchemaOptions } from '../api';
import { AbstractViewModel } from '../models';
import { JsonSchema } from 'src/router/route-definitions';
export declare const buildCollectionSchema: <T extends AbstractViewModel>(ctor: Constructor<T>, schemaOptions: SchemaOptions) => JsonSchema;
export declare const buildArrayPropertySchema: <T extends AbstractViewModel>(ctor: Constructor<T>, propertyName: string) => JsonSchema;
export declare const buildObjectSchema: <T extends AbstractViewModel>(ctor: Constructor<T>) => JsonSchema;
export declare const buildValidationSchema: <T extends AbstractViewModel>(ctor: Constructor<T>) => JsonSchema;
//# sourceMappingURL=validation-schema-builder.d.ts.map