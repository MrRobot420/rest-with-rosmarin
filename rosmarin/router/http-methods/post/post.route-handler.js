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
exports.postRouteHandler = void 0;
const http_response_1 = require("../../http-response");
const http_error_handling_1 = require("../../http-error-handling");
const post_content_negotiator_1 = require("./post.content-negotiator");
const validation_1 = require("../../validation");
const postRouteHandler = (routeDefinitions, 
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
controller) => {
    const contentNegotiator = new post_content_negotiator_1.ContentNegotiator(routeDefinitions);
    return (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const negotiationResult = contentNegotiator.retrieveHandler(req.headers['content-type']);
            validation_1.validateAndTransform(req, negotiationResult.validationAndTransformation.body);
            validation_1.validate(req, 'params', negotiationResult.validationAndTransformation.params);
            validation_1.validate(req, 'query', negotiationResult.validationAndTransformation.query);
            req.acceptedMediaType = negotiationResult.produces;
            const httpResponse = new http_response_1.HttpResponse(reply);
            const configured = yield controller[negotiationResult.method](req, httpResponse);
            yield configured.state.build();
            if (httpResponse.isError === false) {
                reply.removeHeader('content-type');
                reply.send();
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
exports.postRouteHandler = postRouteHandler;
//# sourceMappingURL=post.route-handler.js.map