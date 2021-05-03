import { AbstractModel, ModelId } from '../../../models';
import { AbstractState } from '../abstract-state';
import { CollectionModelDatabaseResult } from '../../../database';
import { HttpResponse } from '../../../router/http-response';
import { FastifyRequest } from 'fastify';
import { AbstractPagingBehaviour } from '../../pagination';
export declare abstract class AbstractGetCollectionState<T extends AbstractModel> extends AbstractState {
    static readonly HEADER_TOTALNUMBEROFRESULTS = "X-totalnumberofresults";
    static readonly HEADER_NUMBEROFRESULTS = "X-numberofresults";
    protected req: FastifyRequest<{
        Body: never;
    }>;
    protected requestedId: ModelId;
    protected databaseResult: CollectionModelDatabaseResult<T>;
    protected pagingBehaviour: AbstractPagingBehaviour;
    protected buildInternal(): Promise<HttpResponse>;
    protected abstract loadModelsFromDatabase(): Promise<CollectionModelDatabaseResult<T>>;
    protected createResponse(): Promise<HttpResponse>;
    protected defineHttpHeaderTotalNumberOfResults(): void;
    protected defineHttpHeaderNumberOfResults(): void;
    protected defineHttpResponseBody(): void;
    protected defineHttpCaching(): void;
    protected abstract defineTransitionLinks(): Promise<void> | void;
    protected extractFromRequest(): void;
    protected abstract definePagingBehaviour(): AbstractPagingBehaviour;
    protected definePagingLinks(): void;
    /**
     * Override this method to change the header name value
     */
    protected getHeaderForTotalNumberOfResults(): string;
    /**
     * Override this method to change the header name value
     */
    protected getHeaderForNumberOfResults(): string;
}
//# sourceMappingURL=abstract-get-collection-state.d.ts.map