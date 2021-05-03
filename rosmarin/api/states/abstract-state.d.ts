import { FastifyRequest } from 'fastify';
import { Logger } from 'pino';
import { HttpResponse } from '../../router/http-response';
import { AuthenticationInfo, IAuthenticationInfoProvider, Roles } from '../security';
import { ApiKeyHeader, ApiKeyInfo, IApiKeyInfoProvider } from '../api-key';
import { Constraint } from '../constraints';
import { AbstractModel } from '../../models';
import { HttpRequest } from '../../router/http-request';
import { Configured } from './state.configured';
import { ExtractOptions } from './state.extract-options';
export declare abstract class AbstractState {
    protected readonly logger: Logger;
    protected req: FastifyRequest;
    protected response: HttpResponse;
    protected readonly authenticationInfoProvider: IAuthenticationInfoProvider;
    protected readonly apiKeyInfoProvider: IApiKeyInfoProvider;
    protected apiKeyVerificationActivated: boolean;
    protected userAuthenticationActivated: boolean;
    protected readonly stateEntryConstraints: Constraint<this>[];
    protected allowedRoles: Roles;
    /**
     * After method {@link #verifyRolesOfClient()} this object contains information about the user that
     * has sent this request.
     */
    protected authenticationInfo: AuthenticationInfo;
    protected apiKeyHeader: ApiKeyHeader;
    protected constructor();
    configure(req: HttpRequest<any>, response: HttpResponse): Configured<this>;
    protected abstract buildInternal(): Promise<HttpResponse>;
    protected addStateEntryConstraint(constraint: Constraint<this>): void;
    protected verifyAllStateEntryConstraints(): Promise<boolean>;
    protected verifyRolesOfClient(): Promise<boolean>;
    protected activateUserAuthentication(): void;
    build(): Promise<void>;
    protected verifyApiKey(): Promise<boolean>;
    private authorizeUser;
    private isAccessWithoutAuthenticationAllowed;
    private isAccessAllowedForThisUser;
    protected activateApiKeyCheck(): void;
    protected configureState(): void;
    protected abstract extractFromRequest(): void;
    private extractFrom;
    protected extractNumberFromQuery(key: string, defaultValue?: number, options?: ExtractOptions<number>): number;
    protected extractBoolFromQuery(key: string, defaultValue?: boolean, options?: ExtractOptions<boolean>): boolean;
    protected extractFromQuery(key: string, defaultValue?: string, options?: ExtractOptions<string>): string;
    protected extractNumberFromParams(key: string, defaultValue?: number, options?: ExtractOptions<number>): number;
    protected extractBoolFromParams(key: string, defaultValue?: boolean, options?: ExtractOptions<boolean>): boolean;
    protected extractFromParams(key: string, defaultValue?: string, options?: ExtractOptions<string>): string;
    protected extractNumberFromHeaders(key: string, defaultValue?: number, options?: ExtractOptions<number>): number;
    protected extractBoolFromHeaders(key: string, defaultValue?: boolean, options?: ExtractOptions<boolean>): boolean;
    protected extractFromHeaders(key: string, defaultValue?: string, options?: ExtractOptions<string>): string;
    protected defineAuthenticationResponseHeaders(): void;
    protected getApiKeInfo(apiKey: ApiKeyHeader): Promise<ApiKeyInfo>;
    protected addConstrainedLink(constraint: Constraint, uriTemplate: string, relType: string, params?: unknown[]): Promise<void>;
    protected addConstrainedLink(constraint: Constraint, uriTemplate: string, relType: string, mediaType: string, params?: unknown[]): Promise<void>;
    /**
     * Add a link header to the HTTP response.
     * Placeholder "{}" can be used to insert params into the link.
     */
    protected addLink(uriTemplate: string, relType: string, params?: unknown[]): void;
    protected addLink(uriTemplate: string, relType: string, mediaType: string, params?: unknown[]): void;
    protected getMediaTypeFromContentTypeHeader(): string;
    protected getAcceptedMediaType(): string;
    private verifyNecessaryApiKey;
    /**
     * Override this methods in specific sub-classes
     */
    protected convertLinks(models: AbstractModel): AbstractModel;
    protected convertLinks(models: AbstractModel[]): AbstractModel[];
}
//# sourceMappingURL=abstract-state.d.ts.map