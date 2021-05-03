import { HttpRequest } from '../../router/http-request';
import { HttpResponse } from '../../router/http-response';
import { Configured } from '../../api';
import { PostUser } from './states/states.post-user';
import { GetSingleUser } from './states/states.get-single-user';
export declare class UsersController {
    postUser(req: HttpRequest, res: HttpResponse): Configured<PostUser>;
    getSingleUser(req: HttpRequest, res: HttpResponse): Configured<GetSingleUser>;
}
//# sourceMappingURL=users.controller.d.ts.map