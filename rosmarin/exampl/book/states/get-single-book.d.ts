import { AbstractGetState } from '../../../api';
import { Book } from '../book.model';
import { SingleModelDatabaseResult } from '../../../database';
import { BookRepository } from '../book.repository';
export declare class GetSingleBook extends AbstractGetState<Book> {
    private bookRepository?;
    constructor(bookRepository?: BookRepository);
    protected defineTransitionLinks(): Promise<void> | void;
    protected loadModelFromDatabase(): Promise<SingleModelDatabaseResult<Book>>;
    protected configureState(): void;
}
//# sourceMappingURL=get-single-book.d.ts.map