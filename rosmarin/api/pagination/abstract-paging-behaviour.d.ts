import { HttpResponse } from '../../router/http-response';
export declare abstract class AbstractPagingBehaviour {
    protected readonly fullUrl: string;
    protected readonly type: string;
    protected constructor(fullUrl: string, type: string);
    protected abstract hasPreviousPage(): boolean;
    protected abstract hasNextPage(): boolean;
    protected abstract hasLastPage(): boolean;
    protected abstract hasFirstPage(): boolean;
    protected abstract getFirstPageLink(): string;
    protected abstract getLastPageLink(): string;
    protected abstract getPrevPageLink(): string;
    protected abstract getNextPageLink(): string;
    protected getSelfLink(): string;
    build(response: HttpResponse): void;
}
//# sourceMappingURL=abstract-paging-behaviour.d.ts.map