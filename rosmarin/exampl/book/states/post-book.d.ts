import { AbstractPostState } from '../../../api';
import { Book } from '../book.model';
import { CreateBookView } from '../views/create-book-view';
import { BookRepository } from '../book.repository';
import { NoContentDatabaseResult } from '../../../database';
export declare class PostBook extends AbstractPostState<Book, CreateBookView> {
    private bookRepository?;
    constructor(bookRepository?: BookRepository);
    protected createDatabaseModel(): Book;
    protected createModelInDatabase(): Promise<NoContentDatabaseResult>;
    protected defineTransitionLinks(): Promise<void> | void;
    protected configureState(): void;
}
//# sourceMappingURL=post-book.d.ts.map