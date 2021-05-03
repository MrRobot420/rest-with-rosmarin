import { Constructor } from '../../types';
import { AbstractViewModel } from '../../models';
import { SchemaOptions } from '../../api';
import { ValidationProperty } from './validation-property';
import { AbstractPropertyStore } from '../abstract-property-store';
/**
 * Currently does not support inheritance
 */
export declare class ValidationMetadataStore<T extends AbstractViewModel> extends AbstractPropertyStore<T, ValidationProperty> {
    private viewSchemaOptions;
    private collectionViewSchemaOptions;
    addSchemaForView<T extends AbstractViewModel>(ctor: Constructor<T>, schemaOptions: SchemaOptions): void;
    getSchemaForView<T extends AbstractViewModel>(ctor: Constructor<T>): SchemaOptions | undefined;
    addSchemaForCollectionView<T extends AbstractViewModel>(ctor: Constructor<T>, schemaOptions: SchemaOptions): void;
    getSchemaForCollectionView<T extends AbstractViewModel>(ctor: Constructor<T>): SchemaOptions | undefined;
}
export declare const validationMetadataStore: ValidationMetadataStore<AbstractViewModel>;
//# sourceMappingURL=validation.store.d.ts.map