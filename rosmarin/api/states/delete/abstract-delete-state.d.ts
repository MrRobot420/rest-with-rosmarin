import { AbstractModel, ModelId } from '../../../models';
import { AbstractState } from '../abstract-state';
import { NoContentDatabaseResult, SingleModelDatabaseResult } from '../../../database';
import { HttpResponse } from '../../../router/http-response';
import { FastifyRequest } from 'fastify';
export declare abstract class AbstractDeleteState<T extends AbstractModel> extends AbstractState {
    protected modelIdToDelete: ModelId;
    protected modelForConstraintCheck: AbstractModel;
    protected dbResultAfterGet: SingleModelDatabaseResult<T>;
    protected dbResultAfterDelete: NoContentDatabaseResult;
    protected responseStatus200: boolean;
    protected req: FastifyRequest;
    protected buildInternal(): Promise<HttpResponse>;
    protected abstract loadModelFromDatabase(): Promise<SingleModelDatabaseResult<T>>;
    protected clientKnowsCurrentModelState(): boolean;
    private createEntityTagOfResult;
    protected abstract deleteModelInDatabase(): Promise<NoContentDatabaseResult>;
    protected createResponse(): Promise<HttpResponse>;
    private defineResponseStatus;
    private defineHttpResponseBody;
    protected extractFromRequest(): void;
    protected abstract defineTransitionLinks(): Promise<void> | void;
}
//# sourceMappingURL=abstract-delete-state.d.ts.map