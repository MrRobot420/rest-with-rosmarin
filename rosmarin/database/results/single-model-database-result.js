"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleModelDatabaseResult = void 0;
const abstract_database_result_1 = require("./abstract-database-result");
class SingleModelDatabaseResult extends abstract_database_result_1.AbstractDatabaseResult {
    constructor(result) {
        super();
        this._result = result;
        this.found = typeof result !== 'undefined';
    }
    get result() {
        return this._result;
    }
    isEmpty() {
        return this.found === false;
    }
}
exports.SingleModelDatabaseResult = SingleModelDatabaseResult;
//# sourceMappingURL=single-model-database-result.js.map