import { Constructor } from '../types';
import constructor from 'tsyringe/dist/typings/types/constructor';
import { AbstractRepository } from './repositories/abstract-repository';
export declare const Repository: <T extends AbstractRepository>(_: Constructor<T>) => (target: constructor<T>) => void;
export declare const UserRepository: (target: Constructor) => void;
export declare const injectUserRepository: () => (target: any, propertyKey: string | symbol, parameterIndex: number) => any;
//# sourceMappingURL=database.decorators.d.ts.map