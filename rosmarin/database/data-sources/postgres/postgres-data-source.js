"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDataSource = void 0;
const pg_1 = require("pg");
const tsyringe_1 = require("tsyringe");
const database_error_1 = require("../../database-error");
const postgres_client_1 = require("./postgres-client");
const constants_1 = __importDefault(require("../../../constants"));
let PostgresDataSource = class PostgresDataSource {
    constructor() {
        this.logger = tsyringe_1.container
            .resolve(constants_1.default.LOGGER)
            .child({ context: 'Postgres' });
        this.logger.debug('Initialize PostgresDataSource with new Connection Pool.');
        this.pool = new pg_1.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'mysecretpassword',
            port: 5432,
        });
    }
    query(query, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.debug(`Query: ${query}`);
                return yield this.pool.query(query, params);
            }
            catch (e) {
                this.logger.error('Cannot query postgres. Error:' + e.message);
                throw new database_error_1.DatabaseError();
            }
        });
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.debug(`Request Pool Client.`);
                const poolClient = yield this.pool.connect();
                return new postgres_client_1.PostgresClient(poolClient, this.logger);
            }
            catch (e) {
                this.logger.error('Cannot connect to Pool Client. ' + e.message);
                throw new database_error_1.DatabaseError();
            }
        });
    }
};
PostgresDataSource = __decorate([
    tsyringe_1.singleton(),
    __metadata("design:paramtypes", [])
], PostgresDataSource);
exports.PostgresDataSource = PostgresDataSource;
//# sourceMappingURL=postgres-data-source.js.map