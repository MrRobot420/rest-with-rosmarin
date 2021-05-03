import { PoolClient, QueryResult } from 'pg';
import { Logger } from 'pino';
export declare class PostgresClient {
    private readonly poolClient;
    private readonly logger;
    constructor(poolClient: PoolClient, logger: Logger);
    begin(): Promise<void>;
    query<T>(query: string, ...params: unknown[]): Promise<QueryResult<T>>;
    end(): Promise<void>;
    private abortAndRollback;
    private releasePoolClient;
}
//# sourceMappingURL=postgres-client.d.ts.map