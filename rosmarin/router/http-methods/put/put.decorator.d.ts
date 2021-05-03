import { JsonSchema, JsonSchemaAndTransformer, Schemas, ViewConverter } from '../../route-definitions';
import { ReturnsConfiguredState, TypedMethodDecorator } from '../../types';
import { AbstractPutState } from '../../../api';
import { AbstractModel } from '../../../models';
import { AbstractViewModel } from '../../../models';
export interface PutRouteDefinition {
    path?: string;
    schema: Schemas<JsonSchema, JsonSchemaAndTransformer>;
    viewConverter?: ViewConverter;
    consumes: string;
    produces?: string;
}
export declare const Put: <State extends AbstractPutState<AbstractModel, AbstractViewModel>>(routeDefinition: PutRouteDefinition) => TypedMethodDecorator<ReturnsConfiguredState<State>>;
//# sourceMappingURL=put.decorator.d.ts.map