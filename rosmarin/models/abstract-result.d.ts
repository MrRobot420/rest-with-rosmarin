export declare abstract class AbstractResult {
    private _hasError;
    errorCode: number;
    errorMessage: string;
    abstract isEmpty(): boolean;
    protected constructor();
    hasError(): boolean;
    setError(): void;
    setError(errorCode: number, errorMessage: string): void;
}
//# sourceMappingURL=abstract-result.d.ts.map