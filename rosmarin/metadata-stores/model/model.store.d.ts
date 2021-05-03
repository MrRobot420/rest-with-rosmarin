import { Constructor } from '../../types';
import { AbstractModel } from '../../models';
import { LinkProperty } from '../../api';
import { AbstractPropertyStore } from '../abstract-property-store';
import { Property } from '../property';
/**
 * Link properties does not support inheritance
 */
export declare class ModelMetadataStore<T extends AbstractModel> extends AbstractPropertyStore<T, Property> {
    private links;
    addLinkProperty<T extends AbstractModel>(ctor: Constructor<T>, link: LinkProperty): void;
    getLinkProperties<T extends AbstractModel>(ctor: Constructor<T>): LinkProperty[];
    isLinkProperty<T extends AbstractModel>(ctor: Constructor<T>, propertyName: string): LinkProperty;
}
export declare const modelMetadataStore: ModelMetadataStore<AbstractModel>;
//# sourceMappingURL=model.store.d.ts.map