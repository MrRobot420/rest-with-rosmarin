import { IError } from '../../models/error-model';
export declare class HttpError extends Error implements IError {
    readonly status: number;
    readonly error: string;
    readonly message: string;
    readonly code?: string | number;
    constructor(status: number, error: string, message?: string, code?: string | number);
}
//# sourceMappingURL=http-error.d.ts.map