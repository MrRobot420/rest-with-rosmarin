import { Property } from './property';
import { Constructor } from '../types';
/**
 * We take the overhead at build time to avoid the time-consuming search for properties in all super classes at runtime.
 */
export declare abstract class AbstractPropertyStore<T, P extends Property> {
    private properties;
    addProperty(ctor: Constructor<T>, property: P): void;
    private addPropertyInternal;
    getProperties(ctor: Constructor<T>): P[];
    getPropertyType<V>(ctor: Constructor<T>, propertyName: string): Constructor<V> | undefined;
    getProperty(ctor: Constructor<T>, propertyName: string): P | undefined;
    getArrayProperties(ctor: Constructor<T>): P[];
    isArrayProperty(ctor: Constructor<T>, propertyName: string): boolean;
    protected searchInSuperClasses(ctor: Constructor, data: P[]): void;
}
//# sourceMappingURL=abstract-property-store.d.ts.map