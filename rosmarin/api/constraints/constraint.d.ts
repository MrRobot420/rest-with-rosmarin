import { AbstractState } from '../states/abstract-state';
export declare type Constraint<T extends AbstractState = AbstractState> = (this: T) => Promise<boolean> | boolean;
//# sourceMappingURL=constraint.d.ts.map