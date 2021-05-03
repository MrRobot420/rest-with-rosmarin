"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const book_controller_1 = require("./book/book.controller");
const rest_application_1 = require("../rest-application");
const auth_1 = require("./auth");
const api_1 = require("../api");
const app = new rest_application_1.RestApplication();
app.registerApiKeyInfoProvider(auth_1.ApiKeyProvider);
app.registerController(book_controller_1.BookController);
console.log(api_1.linkHeader('http://localhost:8080/books', 'getAllBooks', 'application/json'));
app.start();
//# sourceMappingURL=index.js.map