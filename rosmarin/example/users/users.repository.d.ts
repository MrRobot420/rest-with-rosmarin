import { User } from './users.model';
import { NoContentDatabaseResult, SingleModelDatabaseResult } from '../../database';
import { IUserRepository } from '../../database/repositories/user.repository';
import { ModelId } from '../../models';
import { PostgresDataSource } from '../../database/data-sources/postgres/postgres-data-source';
export declare const statement = "\nCREATE TABLE \"USER\"(\n    \"userID\" SERIAL PRIMARY KEY NOT NULL,\n    name VARCHAR(50) NOT NULL,\n    lastModifiedAt bigint NOT NULL,\n    password VARCHAR(50) NOT NULL\n);\n";
export declare const secondStatement = "\n  CREATE TABLE \"ROLE\"(\n    \"roleId\" SERIAL PRIMARY KEY NOT NULL,\n    \"roleName\" VARCHAR(50) NOT NULL\n);\n  ";
export declare const thirdStatement = "\n    CREATE TABLE \"USER_ROLE\"(\n      \"roleId\" int  NOT NULL,\n      \"userId\" int NOT NULL,\n      PRIMARY KEY (\"roleId\", \"userId\"),\n      FOREIGN KEY (\"userId\") REFERENCES \"USER\"(\"userID\"),\n      FOREIGN KEY (\"roleId\") REFERENCES \"ROLE\"(\"roleId\")\n    );\n  ";
export declare const wowStatement = "\n    CREATE TABLE \"USER_WROTE_BOOK\"(\n      \"userId\" int  NOT NULL,\n      \"bookId\" int NOT NULL,\n      PRIMARY KEY (\"bookId\", \"userId\"),\n      FOREIGN KEY (\"userId\") REFERENCES \"USER\"(\"userID\"),\n      FOREIGN KEY (\"bookId\") REFERENCES \"BOOK\"(\"bookId\")\n);\n\n";
interface UserInDatabase {
    name: string;
    password: string;
    userID: number;
    lastmodifiedat: number;
}
export declare class UsersRepository implements IUserRepository {
    private readonly postgres;
    constructor(postgres: PostgresDataSource<UserInDatabase>);
    create(user: User): Promise<NoContentDatabaseResult>;
    readById(id: ModelId): Promise<SingleModelDatabaseResult<User>>;
    readByPrincipal(_principal: string): Promise<SingleModelDatabaseResult<User>>;
}
export {};
//# sourceMappingURL=users.repository.d.ts.map