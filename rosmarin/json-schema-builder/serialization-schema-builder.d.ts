import { Constructor } from '../types';
import { AbstractModel, AbstractViewModel } from '../models';
import { JsonSchema } from 'src/router/route-definitions';
export declare const buildSerializationSchema: <T extends AbstractModel, V extends AbstractViewModel>(from: Constructor<T>, to: Constructor<V>) => JsonSchema;
//# sourceMappingURL=serialization-schema-builder.d.ts.map