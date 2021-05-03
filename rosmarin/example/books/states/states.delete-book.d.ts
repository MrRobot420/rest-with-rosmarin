import { AbstractDeleteState } from '../../../api';
import { Book } from '../books.model';
import { NoContentDatabaseResult, SingleModelDatabaseResult } from '../../../database';
import { BooksRepository } from '../books.repository';
export declare class DeleteBook extends AbstractDeleteState<Book> {
    private readonly bookRepository?;
    constructor(bookRepository?: BooksRepository);
    protected defineTransitionLinks(): Promise<void> | void;
    protected deleteModelInDatabase(): Promise<NoContentDatabaseResult>;
    protected loadModelFromDatabase(): Promise<SingleModelDatabaseResult<Book>>;
}
//# sourceMappingURL=states.delete-book.d.ts.map