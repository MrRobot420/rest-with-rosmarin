import { AbstractGetCollectionStateWithOffsetSizePaging } from '../../../api';
import { Book } from '../books.model';
import { CollectionModelDatabaseResult } from '../../../database';
import { BooksRepository } from '../books.repository';
export declare class GetBooks extends AbstractGetCollectionStateWithOffsetSizePaging<Book> {
    private readonly bookRepository?;
    protected searchForTitle: string;
    constructor(bookRepository?: BooksRepository);
    protected defineTransitionLinks(): Promise<void> | void;
    protected loadModelsFromDatabase(): Promise<CollectionModelDatabaseResult<Book>>;
    protected extractFromRequest(): void;
}
//# sourceMappingURL=states.get-books.d.ts.map