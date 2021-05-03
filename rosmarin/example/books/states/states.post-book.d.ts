import { AbstractPostState } from '../../../api';
import { Book } from '../books.model';
import { CreateBookView } from '../views/views.create-book';
import { NoContentDatabaseResult } from '../../../database';
import { BooksRepository } from '../books.repository';
export declare class PostBook extends AbstractPostState<Book, CreateBookView> {
    private readonly bookRepository?;
    constructor(bookRepository?: BooksRepository);
    protected createDatabaseModel(): Book;
    protected createModelInDatabase(): Promise<NoContentDatabaseResult>;
    protected defineTransitionLinks(): Promise<void> | void;
}
//# sourceMappingURL=states.post-book.d.ts.map