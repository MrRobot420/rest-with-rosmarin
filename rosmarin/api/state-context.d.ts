export declare class StateContext {
    static readonly ST_HTTP_HEADER = "header";
    static readonly ST_AUTH_USER = "auth";
    private readonly store;
    constructor();
    constructor(store: Record<string, unknown>);
    put<T>(key: string, value: T): void;
    get<T>(key: string): T;
}
//# sourceMappingURL=state-context.d.ts.map