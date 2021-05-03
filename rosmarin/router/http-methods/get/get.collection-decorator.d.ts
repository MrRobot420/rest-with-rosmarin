import { AbstractModel } from '../../../models';
import { AbstractGetCollectionState } from '../../../api';
import { ReturnsConfiguredState, TypedMethodDecorator } from '../../types';
import { GetRouteDefinition } from './get.decorator';
export declare const GetCollection: <State extends AbstractGetCollectionState<AbstractModel>>(routeDefinition: GetRouteDefinition) => TypedMethodDecorator<ReturnsConfiguredState<State>>;
//# sourceMappingURL=get.collection-decorator.d.ts.map