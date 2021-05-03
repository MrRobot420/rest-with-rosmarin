import { AbstractResult } from '../../models/abstract-result';
export declare abstract class AbstractDatabaseResult extends AbstractResult {
    protected databaseExecutionTimeInMs: number;
    setTimes(startTime: number, stopTime: number): void;
    getDuration(): number;
}
//# sourceMappingURL=abstract-database-result.d.ts.map