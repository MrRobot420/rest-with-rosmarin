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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouteHandler = void 0;
const delete_content_negotiator_1 = require("./delete.content-negotiator");
const http_response_1 = require("../../http-response");
const http_error_handling_1 = require("../../http-error-handling");
const validation_1 = require("../../validation");
const deleteRouteHandler = (routeDefinitions, 
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
controller) => {
    const contentNegotiator = new delete_content_negotiator_1.ContentNegotiator(routeDefinitions);
    return (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const negotiationResult = contentNegotiator.retrieveHandler(req.headers.accept);
            validation_1.validate(req, 'params', negotiationResult.validationAndTransformation.params);
            validation_1.validate(req, 'query', negotiationResult.validationAndTransformation.query);
            req.acceptedMediaType = negotiationResult.produces;
            const httpResponse = new http_response_1.HttpResponse(reply);
            const configuredState = yield controller[negotiationResult.method](req, httpResponse);
            yield configuredState.state.build();
            if (httpResponse.isError === false) {
                if (typeof httpResponse.entity === 'undefined') {
                    reply.removeHeader('content-type');
                    reply.send();
                }
                else {
                    reply
                        .type((_a = negotiationResult.produces) !== null && _a !== void 0 ? _a : 'application/json')
                        .serializer(negotiationResult.viewConverter)
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
exports.deleteRouteHandler = deleteRouteHandler;
//# sourceMappingURL=delete.route-handler.js.map