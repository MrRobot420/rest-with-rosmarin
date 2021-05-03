import { AbstractState } from '../abstract-state';
import { HttpResponse } from '../../../router/http-response';
export declare abstract class AbstractGetDispatcherState extends AbstractState {
    protected buildInternal(): Promise<HttpResponse>;
    private createResponse;
    protected defineHttpCachingByCacheControl(): void;
    private defineHttpResponseBody;
    private defineHttpCaching;
    protected defineSelfLink(): void;
    protected abstract defineTransitionLinks(): void;
}
//# sourceMappingURL=abstract-get-dispatcher-state.d.ts.map