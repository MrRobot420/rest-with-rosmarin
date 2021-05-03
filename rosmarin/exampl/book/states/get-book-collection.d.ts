import { AbstractGetCollectionStateWithOffsetSizePaging } from '../../../api';
import { Book } from '../book.model';
import { CollectionModelDatabaseResult } from '../../../database';
import { BookRepository } from '../book.repository';
export declare class GetBookCollection extends AbstractGetCollectionStateWithOffsetSizePaging<Book> {
    private bookRepository?;
    protected title: string;
    constructor(bookRepository?: BookRepository);
    protected defineTransitionLinks(): Promise<void> | void;
    protected loadModelsFromDatabase(): Promise<CollectionModelDatabaseResult<Book>>;
    protected extractFromRequest(): void;
}
//# sourceMappingURL=get-book-collection.d.ts.map