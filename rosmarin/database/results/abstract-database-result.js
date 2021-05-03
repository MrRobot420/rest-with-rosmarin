"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDatabaseResult = void 0;
const abstract_result_1 = require("../../models/abstract-result");
class AbstractDatabaseResult extends abstract_result_1.AbstractResult {
    setTimes(startTime, stopTime) {
        this.databaseExecutionTimeInMs = stopTime - startTime;
    }
    getDuration() {
        return this.databaseExecutionTimeInMs;
    }
}
exports.AbstractDatabaseResult = AbstractDatabaseResult;
//# sourceMappingURL=abstract-database-result.js.map