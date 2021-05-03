import { HttpRequest } from '../../router/http-request';
import { HttpResponse } from '../../router/http-response';
import { Configured } from '../../api';
import { PostBook } from './states/states.post-book';
import { GetSingleBook } from './states/states.get-single-book';
import { GetBooks } from './states/states.get-books';
import { DeleteBook } from './states/states.delete-book';
import { UpdateBook } from './states/states.update-book';
export declare class BooksController {
    postBook(req: HttpRequest, res: HttpResponse): Configured<PostBook>;
    getSingleBook(req: HttpRequest, res: HttpResponse): Configured<GetSingleBook>;
    getSingleBookWithoutPublished(req: HttpRequest, res: HttpResponse): Configured<GetSingleBook>;
    getBooks(req: HttpRequest, res: HttpResponse): Configured<GetBooks>;
    deleteBook(req: HttpRequest, res: HttpResponse): Configured<DeleteBook>;
    putBook(req: HttpRequest, res: HttpResponse): Configured<UpdateBook>;
}
//# sourceMappingURL=books.controller.d.ts.map