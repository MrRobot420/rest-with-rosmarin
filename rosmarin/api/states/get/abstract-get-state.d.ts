import { AbstractModel, ModelId } from '../../../models';
import { AbstractStateWithCaching } from '../abstract-state-with-caching';
import { HttpResponse } from '../../../router/http-response';
import { SingleModelDatabaseResult } from '../../../database';
import { FastifyRequest } from 'fastify';
export declare abstract class AbstractGetState<T extends AbstractModel> extends AbstractStateWithCaching {
    constructor();
    protected req: FastifyRequest<{
        Body: never;
    }>;
    protected requestedId: ModelId;
    protected modelForConstraintCheck: AbstractModel;
    protected requestedModel: SingleModelDatabaseResult<T>;
    protected buildInternal(): Promise<HttpResponse>;
    protected createResponse(): Promise<HttpResponse>;
    protected defineHttpResponseBody(): void;
    protected abstract defineTransitionLinks(): Promise<void> | void;
    protected abstract loadModelFromDatabase(): Promise<SingleModelDatabaseResult<T>>;
    protected extractFromRequest(): void;
    protected clientKnowsCurrentModelState(): boolean;
    protected defineSelfLink(): void;
}
//# sourceMappingURL=abstract-get-state.d.ts.map