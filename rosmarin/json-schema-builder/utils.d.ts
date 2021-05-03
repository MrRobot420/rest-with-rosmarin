import { Constructor } from '../types';
import { SchemaOptions } from '../api';
import { Property } from '../metadata-stores';
import { JsonSchema } from '../router/route-definitions';
export declare const isObject: <T>(type: Constructor<T>) => boolean;
export declare const isArray: <T>(type: Constructor<T>) => boolean;
export declare const mergePropertyOptions: <T>(type: Constructor<T>, options: SchemaOptions) => JsonSchema;
export declare const typeOfProperty: <T>(property: Property) => Constructor<T>;
//# sourceMappingURL=utils.d.ts.map