import { AbstractModel, AbstractViewModel, ModelId } from '../../../models';
import { AbstractPutState } from './abstract-put-state';
import { FastifyRequest } from 'fastify';
export declare abstract class AbstractPutRelationState<T extends AbstractModel, V extends AbstractViewModel> extends AbstractPutState<T, V> {
    protected parentId: ModelId;
    protected req: FastifyRequest<{
        Body: V;
    }>;
    protected updatedId: ModelId;
    protected extractFromRequest(): void;
}
//# sourceMappingURL=abstract-put-relation-state.d.ts.map