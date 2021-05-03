import { QueryResult } from 'pg';
import { PostgresClient } from './postgres-client';
export declare class PostgresDataSource<V = unknown> {
    private readonly pool;
    private readonly logger;
    constructor();
    query<T = V>(query: string, ...params: unknown[]): Promise<QueryResult<T>>;
    getClient(): Promise<PostgresClient>;
}
//# sourceMappingURL=postgres-data-source.d.ts.map