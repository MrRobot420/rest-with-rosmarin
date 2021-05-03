"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoContentDatabaseResult = void 0;
const abstract_database_result_1 = require("./abstract-database-result");
class NoContentDatabaseResult extends abstract_database_result_1.AbstractDatabaseResult {
    constructor() {
        super();
    }
    isEmpty() {
        return true;
    }
}
exports.NoContentDatabaseResult = NoContentDatabaseResult;
//# sourceMappingURL=no-content-database-result.js.map