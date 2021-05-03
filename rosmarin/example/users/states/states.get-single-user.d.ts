import { AbstractGetState } from '../../../api';
import { User } from '../users.model';
import { UsersRepository } from '../users.repository';
import { SingleModelDatabaseResult } from '../../../database';
export declare class GetSingleUser extends AbstractGetState<User> {
    private readonly userRepository?;
    constructor(userRepository?: UsersRepository);
    protected defineTransitionLinks(): Promise<void> | void;
    protected loadModelFromDatabase(): Promise<SingleModelDatabaseResult<User>>;
}
//# sourceMappingURL=states.get-single-user.d.ts.map