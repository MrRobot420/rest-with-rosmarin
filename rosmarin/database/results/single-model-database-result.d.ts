import { AbstractModel } from '../../models/abstract-model';
import { AbstractDatabaseResult } from './abstract-database-result';
export declare class SingleModelDatabaseResult<T extends AbstractModel> extends AbstractDatabaseResult {
    private readonly _result;
    protected found: boolean;
    constructor();
    constructor(result: T);
    get result(): T;
    isEmpty(): boolean;
}
//# sourceMappingURL=single-model-database-result.d.ts.map