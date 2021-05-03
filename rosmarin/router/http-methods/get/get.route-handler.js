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
exports.getRouteHandler = void 0;
const validation_1 = require("../../validation");
const http_response_1 = require("../../http-response");
const http_error_handling_1 = require("../../http-error-handling");
const get_content_negotiator_1 = require("./get.content-negotiator");
const getRouteHandler = (routeDefinitions, 
// any is bad! But we need it here because we do not know what we have here
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
controller) => {
    const contentNegotiator = new get_content_negotiator_1.ContentNegotiator(routeDefinitions);
    return (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const negotiationResult = contentNegotiator.retrieveHandler(req.headers.accept);
            validation_1.validate(req, 'params', negotiationResult.validationAndTransformation.params);
            validation_1.validate(req, 'query', negotiationResult.validationAndTransformation.query);
            req.acceptedMediaType = negotiationResult.produces;
            const httpResponse = new http_response_1.HttpResponse(reply);
            const configured = yield controller[negotiationResult.method](req, httpResponse);
            yield configured.state.build();
            if (httpResponse.isError === false) {
                reply
                    .serializer(negotiationResult.viewConverter)
                    .type(negotiationResult.produces)
                    .send(httpResponse.entity);
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
exports.getRouteHandler = getRouteHandler;
//# sourceMappingURL=get.route-handler.js.map