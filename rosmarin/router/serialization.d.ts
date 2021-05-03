import { IError } from '../models/error-model';
import { Constructor } from '../types';
import { AbstractModel } from '../models';
import { AbstractViewModel } from '../models';
import { ViewConverter } from './route-definitions';
export declare const serializeErrorResponse: (error: IError) => string;
export declare const buildViewConverter: <T extends AbstractModel, V extends AbstractViewModel>(from: Constructor<T>, to: Constructor<V>) => ViewConverter | undefined;
//# sourceMappingURL=serialization.d.ts.map