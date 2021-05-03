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
exports.PostgresClient = void 0;
const database_error_1 = require("../../database-error");
class PostgresClient {
    constructor(poolClient, logger) {
        this.poolClient = poolClient;
        this.logger = logger;
    }
    begin() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('Start Transaction.');
            try {
                yield this.poolClient.query('BEGIN');
            }
            catch (e) {
                this.logger.error('Cannot BEGIN transaction. Release Pool Client. ' + e.message);
                this.releasePoolClient();
                throw new database_error_1.DatabaseError();
            }
        });
    }
    query(query, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.poolClient.query(query, params);
            }
            catch (e) {
                this.logger.error('Cannot QUERY Pool Client. ' + e.message);
                yield this.abortAndRollback();
                throw new database_error_1.DatabaseError();
            }
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('End Transaction.');
            try {
                yield this.poolClient.query('COMMIT');
            }
            catch (e) {
                this.logger.error('Cannot COMMIT transaction. Try to ROLLBACK all changes. ' + e.message);
                yield this.abortAndRollback();
                throw new database_error_1.DatabaseError();
            }
            finally {
                this.releasePoolClient();
            }
        });
    }
    abortAndRollback() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('Abort Transaction and rollback client.');
            try {
                yield this.poolClient.query('ROLLBACK');
            }
            catch (e) {
                this.logger.error('ROLLBACK failed. Release Pool Client without rolling back changes. ' +
                    e.message);
            }
            finally {
                this.releasePoolClient();
            }
        });
    }
    releasePoolClient() {
        this.logger.debug('RELEASE Pool Client.');
        try {
            this.poolClient.release();
        }
        catch (e) {
            this.logger.error('Releasing Pool Client failed. ' + e.message);
        }
    }
}
exports.PostgresClient = PostgresClient;
//# sourceMappingURL=postgres-client.js.map