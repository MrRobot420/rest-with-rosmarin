import { AbstractModel, AbstractViewModel, ModelId } from '../../../models';
import { NoContentDatabaseResult, SingleModelDatabaseResult } from '../../../database';
import { HttpResponse } from '../../../router/http-response';
import { AbstractStateWithCaching } from '../abstract-state-with-caching';
import { FastifyRequest } from 'fastify';
export declare abstract class AbstractPutState<T extends AbstractModel, V extends AbstractViewModel> extends AbstractStateWithCaching {
    protected modelToUpdate: V;
    protected dbResultAfterGet: SingleModelDatabaseResult<T>;
    protected modelInDatabase: T;
    protected modelForConstraintCheck: AbstractModel;
    protected dbResultAfterUpdate: NoContentDatabaseResult;
    protected responseStatus200: boolean;
    protected usingPutToCreateAllowed: boolean;
    protected req: FastifyRequest<{
        Body: V;
    }>;
    protected updatedId: ModelId;
    protected buildInternal(): Promise<HttpResponse>;
    protected abstract loadModelFromDatabase(): Promise<SingleModelDatabaseResult<T>>;
    protected extractFromRequest(): void;
    protected clientKnowsCurrentModelState(): boolean;
    private mergeViewModelIntoDatabaseModel;
    protected abstract updateModelInDatabase(): Promise<NoContentDatabaseResult>;
    protected createResponse(): Promise<HttpResponse>;
    protected abstract defineTransitionLinks(): Promise<void> | void;
    private defineResponseStatus;
    protected defineHttpResponseBody(): void;
    protected defineSelfLink(): void;
}
//# sourceMappingURL=abstract-put-state.d.ts.map