"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApplication = void 0;
const router_1 = require("./router");
const pino_1 = __importDefault(require("pino"));
const tsyringe_1 = require("tsyringe");
const constants_1 = __importDefault(require("./constants"));
const api_1 = require("./api");
class RestApplication {
    constructor(config = {}) {
        this.controllers = [];
        this.logger = pino_1.default(this.determineLoggingOptions(config.loggingOptions));
        this.logger.debug(`LOG LEVEL is set to ${this.logger.level.toUpperCase()}`);
        this.router = new router_1.Router(this.logger, {
            prefix: config.prefix,
            disableRequestLogging: true,
        });
    }
    determineLoggingOptions(options) {
        var _a, _b;
        if (process.env.NODE_ENV === 'production') {
            return {
                prettyPrint: false,
                level: 'info',
            };
        }
        return {
            level: (_a = options === null || options === void 0 ? void 0 : options.level) !== null && _a !== void 0 ? _a : 'trace',
            prettyPrint: (_b = options === null || options === void 0 ? void 0 : options.prettyPrint) !== null && _b !== void 0 ? _b : true,
        };
    }
    configureContainer() {
        if (tsyringe_1.container.isRegistered(constants_1.default.AUTHENTICATION_INFO_PROVIDER) === false) {
            this.logger.info(`No AuthenticationInfoProvider registered. The NoAuthenticationInfoProvider will be used. Please register a provider with @AuthenticationInfoProvider.`);
            tsyringe_1.container.register(constants_1.default.AUTHENTICATION_INFO_PROVIDER, api_1.NoAuthenticationInfoProvider);
        }
        if (tsyringe_1.container.isRegistered(constants_1.default.API_KEY_INFO_PROVIDER) === false) {
            this.logger.info(`No ApiKeyInfoProvider registered. The default provider will be used. Please register a provider with @ApiKeyInfoProvider if you use API key verification in your application.`);
            tsyringe_1.container.register(constants_1.default.API_KEY_INFO_PROVIDER, api_1.NoApiKeyProvider);
        }
        tsyringe_1.container.registerInstance(constants_1.default.LOGGER, this.logger);
    }
    registerApiKeyInfoProvider(provider) {
        tsyringe_1.container.registerSingleton(constants_1.default.API_KEY_INFO_PROVIDER, provider);
    }
    registerAuthenticationInfoProvider(provider) {
        tsyringe_1.container.registerSingleton(constants_1.default.AUTHENTICATION_INFO_PROVIDER, provider);
    }
    registerController(...controllers) {
        this.controllers.push(...controllers);
    }
    start(port = 8080, host = '127.0.0.1') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.router.registerControllers(this.controllers);
                this.configureContainer();
                yield this.router.listen(port, host);
            }
            catch (err) {
                this.logger.fatal('Cannot start application.\n' + err.stack);
                this.logger.fatal('Exit process with non-zero value.');
                process.exit(1);
            }
        });
    }
}
exports.RestApplication = RestApplication;
process.on('unhandledRejection', (reason) => {
    throw new Error(reason);
});
process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception. ' + error.stack); // TODO replace console.log
    console.log('Exit process with non-zero value.');
    process.exit(1);
});
//# sourceMappingURL=rest-application.js.map