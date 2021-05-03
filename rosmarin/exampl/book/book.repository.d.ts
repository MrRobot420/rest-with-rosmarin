import { Book } from './book.model';
import { CollectionModelDatabaseResult, NoContentDatabaseResult, SingleModelDatabaseResult } from '../../database';
export interface BookInDatabase {
    id: string;
    lastModifiedAt: number;
    title: string;
    description: string;
}
export declare class BookRepository {
    private readonly db;
    constructor();
    private static generateId;
    private static page;
    create(book: Book): Promise<NoContentDatabaseResult>;
    readById(id: string): Promise<SingleModelDatabaseResult<Book>>;
    readAll(title: string, offset: number, size: number): Promise<CollectionModelDatabaseResult<Book>>;
    deleteById(id: string): Promise<void>;
    update(book: Book): Promise<void>;
}
//# sourceMappingURL=book.repository.d.ts.map