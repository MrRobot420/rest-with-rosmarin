import { AbstractPagingBehaviour } from './abstract-paging-behaviour';
export declare class PagingBehaviourUsingOffsetSize extends AbstractPagingBehaviour {
    protected readonly totalNumberOfResults: number;
    protected readonly offset: number;
    protected readonly size: number;
    protected readonly defaultPageSize: number;
    static readonly QUERY_PARAM_SIZE = "size";
    static readonly QUERY_PARAM_OFFSET = "offset";
    static readonly DEFAULT_PAGE_SIZE = 10;
    constructor(fullUrl: string, totalNumberOfResults: number, offset: number, size: number, type: string, defaultPageSize?: number);
    protected hasFirstPage(): boolean;
    protected hasLastPage(): boolean;
    protected hasNextPage(): boolean;
    protected hasPreviousPage(): boolean;
    protected getFirstPageLink(): string;
    protected getLastPageLink(): string;
    protected getPrevPageLink(): string;
    protected getNextPageLink(): string;
    private getLastLinkSize;
    private getLastLinkOffset;
    private currentOffsetPlusTwoPages;
    private getFirstLinkSize;
    private getPreviousLinkSize;
    private getPreviousLinkOffset;
    private getNextLinkSize;
    private getNextLinkOffset;
}
//# sourceMappingURL=paging-behaviour-using-offset-size.d.ts.map