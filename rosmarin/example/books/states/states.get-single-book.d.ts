import { AbstractGetState } from '../../../api';
import { Book } from '../books.model';
import { BooksRepository } from '../books.repository';
import { SingleModelDatabaseResult } from '../../../database';
export declare class GetSingleBook extends AbstractGetState<Book> {
    private readonly bookRepository?;
    constructor(bookRepository?: BooksRepository);
    protected defineTransitionLinks(): Promise<void> | void;
    protected loadModelFromDatabase(): Promise<SingleModelDatabaseResult<Book>>;
    protected configureState(): void;
}
//# sourceMappingURL=states.get-single-book.d.ts.map