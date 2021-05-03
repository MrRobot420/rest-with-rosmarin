import { AbstractDeleteState } from './abstract-delete-state';
import { AbstractModel, ModelId } from '../../../models';
import { FastifyRequest } from 'fastify';
export declare abstract class AbstractDeleteRelationState<T extends AbstractModel> extends AbstractDeleteState<T> {
    protected parentId: ModelId;
    protected _req: FastifyRequest;
    protected extractFromRequest(): void;
}
//# sourceMappingURL=abstract-delete-relation-state.d.ts.map