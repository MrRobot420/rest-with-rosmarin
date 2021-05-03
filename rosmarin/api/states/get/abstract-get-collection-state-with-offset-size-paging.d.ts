import { AbstractGetCollectionState } from './abstract-get-collection-state';
import { AbstractModel } from '../../../models';
import { AbstractPagingBehaviour } from '../../pagination';
export declare abstract class AbstractGetCollectionStateWithOffsetSizePaging<T extends AbstractModel> extends AbstractGetCollectionState<T> {
    protected size: number;
    protected offset: number;
    protected definePagingBehaviour(): AbstractPagingBehaviour;
    protected extractFromRequest(): void;
    protected getDefaultSize(): number;
    protected getDefaultOffset(): number;
}
//# sourceMappingURL=abstract-get-collection-state-with-offset-size-paging.d.ts.map