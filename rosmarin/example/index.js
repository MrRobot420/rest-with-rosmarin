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
require("reflect-metadata");
const rest_application_1 = require("../rest-application");
const books_controller_1 = require("./books/books.controller");
const users_controller_1 = require("./users/users.controller");
const performance_controller_1 = require("./performance/performance.controller");
const views_create_user_1 = require("./users/views/views.create-user");
const json_schema_builder_1 = require("../json-schema-builder");
/*
TODOs:
  - remove promise from handler method signature
  - remove default json web token auth provider
  - add pre server start hook with access to data sources
 */
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = new rest_application_1.RestApplication({
        prefix: '/api',
        loggingOptions: {
            prettyPrint: true,
            level: 'debug',
        },
    });
    app.registerController(books_controller_1.BooksController, users_controller_1.UsersController, performance_controller_1.PerformanceController);
    console.log(json_schema_builder_1.buildValidationSchema(views_create_user_1.CreateUserView));
    yield app.start();
});
start();
//# sourceMappingURL=index.js.map