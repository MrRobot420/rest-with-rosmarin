import { CollectionModelDatabaseResult, NoContentDatabaseResult, SingleModelDatabaseResult } from '../../database';
import { Book } from './books.model';
import { AbstractRepository } from '../../database/repositories/abstract-repository';
import { ModelId } from '../../models';
import { PostgresDataSource } from '../../database/data-sources/postgres/postgres-data-source';
interface BookInDatabase {
    bookId: number;
    title: string;
    published: number;
    lastmodifiedat: number;
}
export declare const statement = "\nCREATE TABLE \"BOOK\"(\n    \"bookId\" SERIAL PRIMARY KEY NOT NULL,\n    title VARCHAR(50) NOT NULL,\n    lastModifiedAt bigint NOT NULL,\n    published bigint NOT NULL\n);\n";
export declare class BooksRepository extends AbstractRepository {
    private readonly postgres;
    constructor(postgres: PostgresDataSource<BookInDatabase>);
    create(book: Book): Promise<NoContentDatabaseResult>;
    readById(id: ModelId): Promise<SingleModelDatabaseResult<Book>>;
    readBooksByTitle(title: string, offset: number, size: number): Promise<CollectionModelDatabaseResult<Book>>;
    deleteBook(id: ModelId): Promise<NoContentDatabaseResult>;
    updateBook(book: Book): Promise<NoContentDatabaseResult>;
}
export {};
//# sourceMappingURL=books.repository.d.ts.map