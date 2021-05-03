import { AbstractModel, AbstractViewModel } from '../../models';
import { Constructor } from '../../types';
import { Logger } from 'pino';
export declare const isConstructorOfPrimitiveValue: (ctor: Constructor<unknown>) => boolean;
export declare const merge: <T extends AbstractModel>(source: AbstractViewModel, target: T, logger?: Logger) => T;
//# sourceMappingURL=view-merger.d.ts.map