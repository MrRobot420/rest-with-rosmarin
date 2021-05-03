import { IError } from '../../models/error-model';
/**
 * HTTP error thrown during runtime within the router.
 *
 * DO NOT use it in your application.
 */
export declare class RouterError extends Error implements IError {
    readonly status: number;
    readonly error: string;
    readonly message: string;
    readonly code?: string | number;
    constructor(status: number, error: string, message?: string, code?: string | number);
    toJSON(): Record<string, string | number>;
}
//# sourceMappingURL=router-error.d.ts.map