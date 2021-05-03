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
exports.putRouteHandler = void 0;
const put_content_negotiator_1 = require("./put.content-negotiator");
const http_response_1 = require("../../http-response");
const http_error_handling_1 = require("../../http-error-handling");
const validation_1 = require("../../validation");
const constants_1 = __importDefault(require("../../../constants"));
const putRouteHandler = (routeDefinitions, 
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
controller) => {
    const contentNegotiator = new put_content_negotiator_1.ContentNegotiator(routeDefinitions);
    return (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const negotiationResult = contentNegotiator.retrieveHandler(req.headers['content-type'], req.headers.accept);
            validation_1.validateAndTransform(req, negotiationResult.validationAndTransformation.body);
            validation_1.validate(req, 'params', negotiationResult.validationAndTransformation.params);
            validation_1.validate(req, 'query', negotiationResult.validationAndTransformation.query);
            req.acceptedMediaType = negotiationResult.produces;
            const httpResponse = new http_response_1.HttpResponse(reply);
            const configured = yield controller[negotiationResult.method](req, httpResponse);
            yield configured.state.build();
            if (httpResponse.isError === false) {
                if (typeof httpResponse.entity === 'undefined') {
                    reply.removeHeader('content-type');
                    reply.send();
                }
                else {
                    reply
                        .type((_a = negotiationResult.produces) !== null && _a !== void 0 ? _a : constants_1.default.DEFAULT_MEDIA_TYPE)
                        .serializer((_b = negotiationResult.viewConverter) !== null && _b !== void 0 ? _b : JSON.stringify)
                        .send(httpResponse.entity);
                }
            }
            else {
                http_error_handling_1.sendErrorResponse(reply, httpResponse.entity);
            }
        }
        catch (e) {
            http_error_handling_1.handleError(e, req, reply);
        }
    });
};
exports.putRouteHandler = putRouteHandler;
//# sourceMappingURL=put.route-handler.js.map