import { AbstractModel } from '../../models/abstract-model';
import { AbstractDatabaseResult } from './abstract-database-result';
export declare class CollectionModelDatabaseResult<T extends AbstractModel = AbstractModel> extends AbstractDatabaseResult {
    private _databaseResult;
    totalNumberOfResult: number;
    get databaseResult(): T[];
    set databaseResult(value: T[]);
    constructor();
    constructor(databaseResult: T[]);
    isEmpty(): boolean;
}
//# sourceMappingURL=collection-model-database-result.d.ts.map