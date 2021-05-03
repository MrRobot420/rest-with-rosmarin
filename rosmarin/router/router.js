"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const fastify_1 = __importDefault(require("fastify"));
const http_methods_1 = require("./http-methods");
const http_error_handling_1 = require("./http-error-handling");
const tsyringe_1 = require("tsyringe");
const validation_1 = __importStar(require("./validation"));
const route_handler_1 = require("./route-handler");
const conditional_request_evaluation_1 = require("./conditional-request-evaluation");
const route_registration_error_1 = require("./errors/route-registration-error");
const metadata_stores_1 = require("../metadata-stores");
const santizieUrl_1 = require("./santizieUrl");
const httpVerbRegex = /get|post|put|delete/i;
const pathParameterRegex = /:/g;
class Router {
    constructor(logger, routerConfig = {}) {
        var _a;
        this.routerConfig = routerConfig;
        this.compileRouteDefinitions = (definitions) => {
            return definitions.map((definition) => {
                var _a, _b, _c, _d, _e, _f;
                return {
                    produces: definition.produces,
                    consumes: definition.consumes,
                    method: definition.method,
                    validationAndTransformation: {
                        body: {
                            validationFn: validation_1.compileSchema((_a = definition.schema) === null || _a === void 0 ? void 0 : _a.body.schema),
                            transformationFn: (_c = (_b = definition.schema) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.transformer,
                        },
                        query: validation_1.compileSchema((_d = definition.schema) === null || _d === void 0 ? void 0 : _d.query),
                        params: validation_1.compileSchema((_e = definition.schema) === null || _e === void 0 ? void 0 : _e.params),
                        headers: validation_1.compileSchema((_f = definition.schema) === null || _f === void 0 ? void 0 : _f.headers),
                    },
                    viewConverter: definition.viewConverter,
                };
            });
        };
        this.logger = logger.child({ context: 'Router' });
        this.fastify = fastify_1.default({
            ignoreTrailingSlash: true,
            onProtoPoisoning: 'error',
            onConstructorPoisoning: 'error',
            disableRequestLogging: (_a = routerConfig.disableRequestLogging) !== null && _a !== void 0 ? _a : false,
            logger,
        });
        this.addContentType = this.fastify.addContentTypeParser.bind(this.fastify);
    }
    configureFastify(fastify) {
        const prefix = this.getPrefix();
        fastify.addContentTypeParser(/\+json$/, { parseAs: 'string' }, this.fastify.getDefaultJsonParser('error', 'ignore'));
        fastify.setErrorHandler(http_error_handling_1.handleError);
        fastify.setNotFoundHandler(http_error_handling_1.notFound);
        fastify.setValidatorCompiler(({ schema }) => {
            return validation_1.default.compile(schema);
        });
        fastify.decorateRequest('acceptedMediaType', '');
        fastify.decorateRequest('evaluateConditionalGetRequest', conditional_request_evaluation_1.evaluateConditionalGetRequest);
        fastify.decorateRequest('evaluateConditionalPutRequest', conditional_request_evaluation_1.evaluateConditionalPutRequest);
        fastify.decorateRequest('fullUrl', function () {
            return this.protocol + ':/' + santizieUrl_1.sanitizeUrl(this.hostname + this.url);
        });
        fastify.decorateRequest('baseUrl', function () {
            return this.protocol + ':/' + santizieUrl_1.sanitizeUrl(this.hostname + prefix);
        });
    }
    listen(port, host) {
        return this.fastify.listen({ port, host });
    }
    registerControllers(controllers) {
        this.fastify.register((fastify, _opts, done) => {
            this.configureFastify(fastify);
            controllers.forEach((controller) => {
                try {
                    this.registerController(controller, fastify);
                }
                catch (error) {
                    this.logger.error(`Error while register controller ${controller.name}.\n${error.stack}`);
                    done(error);
                }
            });
            done();
        }, { prefix: this.getPrefix() });
    }
    getPrefix() {
        if (this.routerConfig.prefix)
            return santizieUrl_1.sanitizeUrl(this.routerConfig.prefix);
        return '';
    }
    registerController(controller, fastify) {
        const routeStore = this.buildRoutes(controller);
        if (!routeStore)
            return this.logger.debug(`Skip controller "${controller.name}" because it was not registered as a controller. Did you decorate it with @Controller()?`);
        // Retrieve the controller instance via the DI container to allow the user to inject other dependencies
        const instance = tsyringe_1.container.resolve(controller);
        this.logger.debug(`Register Controller "${controller.name}". Start to search for routes.`);
        for (const [path, value] of Object.entries(routeStore)) {
            for (const [httpMethod, definitions] of Object.entries(value)) {
                try {
                    this.validateRegisteredRouterPath(path);
                    /*
                    We validate the route definitions before we compile and register them.
                    We are very strict about this to prevent non HTTP/ REST compliant development in any case.
                    */
                    http_methods_1.validateRouteDefinitions(definitions, httpMethod, instance.constructor.name);
                    const compiledDefinition = this.compileRouteDefinitions(definitions);
                    const handler = route_handler_1.createRouteHandler(compiledDefinition, instance, httpMethod);
                    fastify.route({
                        method: httpMethod,
                        url: path,
                        handler,
                    });
                    this.logger.debug(`Registered [ ${httpMethod} ${path} ] route${compiledDefinition.length > 1
                        ? ` with ${compiledDefinition.length} different handlers`
                        : ''}.`);
                }
                catch (err) {
                    if (err instanceof route_registration_error_1.RouteRegistrationError) {
                        this.logger.warn(`Registration of route [ ${httpMethod} ${path} ] will be skipped. Reason: ${err.message}${typeof err.details !== 'undefined'
                            ? '\nSee details: ' + err.details
                            : ''}`);
                    }
                    else {
                        this.logger.error(`Registration of route [ ${httpMethod} ${path} ] failed unexpectedly and will be skipped. ${err.stack}`);
                    }
                }
            }
        }
    }
    buildRoutes(controller) {
        var _a;
        const store = {};
        const controllerMetadata = metadata_stores_1.routerMetadataStore.getController(controller);
        if (typeof (controllerMetadata === null || controllerMetadata === void 0 ? void 0 : controllerMetadata.prefix) === 'undefined')
            return undefined;
        const routes = metadata_stores_1.routerMetadataStore.getRoutes(controller);
        for (const routeDefinition of routes) {
            const fullPath = santizieUrl_1.sanitizeUrl(controllerMetadata.prefix + ((_a = routeDefinition.path) !== null && _a !== void 0 ? _a : '/'));
            if (!store[fullPath]) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                store[fullPath] = {};
            }
            if (store[fullPath][routeDefinition.httpMethod]) {
                store[fullPath][routeDefinition.httpMethod] = [
                    ...store[fullPath][routeDefinition.httpMethod],
                    routeDefinition,
                ];
            }
            else {
                store[fullPath][routeDefinition.httpMethod] = [routeDefinition];
            }
        }
        return store;
    }
    validateRegisteredRouterPath(path) {
        var _a;
        if (httpVerbRegex.test(path)) {
            this.logger.warn(`Path '${path}' looks like you are using a verb in it. But that's evil and you probably shouldn't do that.`);
        }
        if (((_a = path.match(pathParameterRegex)) !== null && _a !== void 0 ? _a : []).length >= 2) {
            this.logger.warn(`WARNING.`); // TODO
        }
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map