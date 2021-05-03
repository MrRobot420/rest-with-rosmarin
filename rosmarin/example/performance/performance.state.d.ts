import { AbstractGetState } from '../../api';
import { EmptyModel } from '../../models/empty-model';
import { SingleModelDatabaseResult } from '../../database';
export declare class GetPerformance extends AbstractGetState<EmptyModel> {
    protected defineTransitionLinks(): Promise<void> | void;
    protected loadModelFromDatabase(): Promise<SingleModelDatabaseResult<EmptyModel>>;
}
//# sourceMappingURL=performance.state.d.ts.map