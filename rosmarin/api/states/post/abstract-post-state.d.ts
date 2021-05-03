import { AbstractModel, AbstractViewModel } from '../../../models';
import { AbstractState } from '../abstract-state';
import { NoContentDatabaseResult } from '../../../database';
import { HttpResponse } from '../../../router/http-response';
import { FastifyRequest } from 'fastify';
export declare abstract class AbstractPostState<T extends AbstractModel, V extends AbstractViewModel> extends AbstractState {
    protected modelToCreate: V;
    protected modelToStoreInDatabase: T;
    protected modelForConstraintCheck: AbstractModel;
    protected dbResultAfterSave: NoContentDatabaseResult;
    protected req: FastifyRequest<{
        Body: V;
    }>;
    protected buildInternal(): Promise<HttpResponse>;
    protected createResponse(): Promise<HttpResponse>;
    protected extractFromRequest(): void;
    protected defineLocationLink(): void;
    protected abstract defineTransitionLinks(): Promise<void> | void;
    private mergeViewModelToDatabaseModel;
    /**
     * You should override this method in subclasses if you do not want to use the built-in merge function which requires to annotate the incoming view model
     */
    protected merge(source: V, target: T): T;
    protected abstract createDatabaseModel(): T;
    protected abstract createModelInDatabase(): Promise<NoContentDatabaseResult>;
}
//# sourceMappingURL=abstract-post-state.d.ts.map