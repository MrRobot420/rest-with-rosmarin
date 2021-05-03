import { TypeFn } from '../../metadata-stores';
export declare type SchemaOptions = Record<string, any>;
export declare const viewArrayProp: (typeFn: TypeFn, schemaOptions?: SchemaOptions) => PropertyDecorator;
export declare const viewProp: (schemaOptions?: SchemaOptions, typeFn?: TypeFn) => PropertyDecorator;
export declare const view: (schemaOptions: SchemaOptions) => ClassDecorator;
export declare const collectionView: (schemaOptions?: SchemaOptions) => ClassDecorator;
//# sourceMappingURL=views.decorators.d.ts.map