import { AbstractPutState } from '../../../api';
import { Book } from '../books.model';
import { UpdateBookView } from '../views/views.update-book';
import { NoContentDatabaseResult, SingleModelDatabaseResult } from '../../../database';
import { BooksRepository } from '../books.repository';
export declare class UpdateBook extends AbstractPutState<Book, UpdateBookView> {
    private readonly bookRepository?;
    constructor(bookRepository?: BooksRepository);
    protected defineTransitionLinks(): Promise<void> | void;
    protected loadModelFromDatabase(): Promise<SingleModelDatabaseResult<Book>>;
    protected updateModelInDatabase(): Promise<NoContentDatabaseResult>;
    protected configureState(): void;
}
//# sourceMappingURL=states.update-book.d.ts.map