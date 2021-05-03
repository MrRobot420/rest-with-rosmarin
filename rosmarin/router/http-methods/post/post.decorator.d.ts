import { JsonSchema, JsonSchemaAndTransformer, Schemas } from '../../route-definitions';
import { ReturnsConfiguredState, TypedMethodDecorator } from '../../types';
import { AbstractPostState } from '../../../api';
import { AbstractModel, AbstractViewModel } from '../../../models';
export interface PostRouteDefinition {
    path?: string;
    schema: Schemas<JsonSchema, JsonSchemaAndTransformer>;
    consumes: string;
}
export declare const Post: <State extends AbstractPostState<AbstractModel, AbstractViewModel>>(routeDefinition: PostRouteDefinition) => TypedMethodDecorator<ReturnsConfiguredState<State>>;
//# sourceMappingURL=post.decorator.d.ts.map