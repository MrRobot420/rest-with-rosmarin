import { PostBook } from './states/post-book';
import { HttpRequest } from '../../router/http-request';
import { HttpResponse } from '../../router/http-response';
import { Configured } from '../../api';
import { GetSingleBook } from './states/get-single-book';
import { GetSingleBookAsAdmin } from './states/get-single-book-as-admin';
import { GetBookCollection } from './states/get-book-collection';
export declare class BookController {
    postBook(req: HttpRequest, res: HttpResponse): Configured<PostBook>;
    getSingleBook(req: HttpRequest, res: HttpResponse): Configured<GetSingleBook>;
    getSingleBookAdmin(req: HttpRequest, res: HttpResponse): Configured<GetSingleBookAsAdmin>;
    getAllBooks(req: HttpRequest, res: HttpResponse): Configured<GetBookCollection>;
}
//# sourceMappingURL=book.controller.d.ts.map