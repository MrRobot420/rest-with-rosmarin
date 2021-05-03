import { AbstractPostState } from '../../../api';
import { CreateUserView } from '../views/views.create-user';
import { User } from '../users.model';
import { NoContentDatabaseResult } from '../../../database';
import { UsersRepository } from '../users.repository';
export declare class PostUser extends AbstractPostState<User, CreateUserView> {
    private readonly userRepository?;
    constructor(userRepository?: UsersRepository);
    protected createDatabaseModel(): User;
    protected createModelInDatabase(): Promise<NoContentDatabaseResult>;
    protected defineTransitionLinks(): Promise<void> | void;
}
//# sourceMappingURL=states.post-user.d.ts.map