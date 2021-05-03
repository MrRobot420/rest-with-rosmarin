"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionModelDatabaseResult = void 0;
const abstract_database_result_1 = require("./abstract-database-result");
class CollectionModelDatabaseResult extends abstract_database_result_1.AbstractDatabaseResult {
    constructor(databaseResult) {
        super();
        this.totalNumberOfResult = 0;
        this._databaseResult = databaseResult !== null && databaseResult !== void 0 ? databaseResult : [];
    }
    get databaseResult() {
        return this._databaseResult;
    }
    set databaseResult(value) {
        this._databaseResult = Array.isArray(value) ? value : [];
    }
    isEmpty() {
        var _a;
        return ((_a = this._databaseResult) === null || _a === void 0 ? void 0 : _a.length) === 0;
    }
}
exports.CollectionModelDatabaseResult = CollectionModelDatabaseResult;
//# sourceMappingURL=collection-model-database-result.js.map