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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = exports.wowStatement = exports.thirdStatement = exports.secondStatement = exports.statement = void 0;
const users_model_1 = require("./users.model");
const database_1 = require("../../database");
const postgres_data_source_1 = require("../../database/data-sources/postgres/postgres-data-source");
const tsyringe_1 = require("tsyringe");
exports.statement = `
CREATE TABLE "USER"(
    "userID" SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastModifiedAt bigint NOT NULL,
    password VARCHAR(50) NOT NULL
);
`;
exports.secondStatement = `
  CREATE TABLE "ROLE"(
    "roleId" SERIAL PRIMARY KEY NOT NULL,
    "roleName" VARCHAR(50) NOT NULL
);
  `;
exports.thirdStatement = `
    CREATE TABLE "USER_ROLE"(
      "roleId" int  NOT NULL,
      "userId" int NOT NULL,
      PRIMARY KEY ("roleId", "userId"),
      FOREIGN KEY ("userId") REFERENCES "USER"("userID"),
      FOREIGN KEY ("roleId") REFERENCES "ROLE"("roleId")
    );
  `;
exports.wowStatement = `
    CREATE TABLE "USER_WROTE_BOOK"(
      "userId" int  NOT NULL,
      "bookId" int NOT NULL,
      PRIMARY KEY ("bookId", "userId"),
      FOREIGN KEY ("userId") REFERENCES "USER"("userID"),
      FOREIGN KEY ("bookId") REFERENCES "BOOK"("bookId")
);

`;
let UsersRepository = class UsersRepository {
    constructor(postgres) {
        this.postgres = postgres;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield this.postgres.getClient();
                yield client.begin();
                const createUser = `
          INSERT INTO "USER"(name, lastmodifiedat, password)
          VALUES ($1, $2, $3)
          RETURNING "userID"
      `;
                const queryResult = yield this.postgres.query(createUser, user.principal, user.lastModifiedAt, user.password);
                user.id = queryResult.rows[0].userID;
                const searchRoleId = `
         SELECT *
         FROM "ROLE"
         WHERE "roleName" = $1
      `;
                const roleIdResult = yield this.postgres.query(searchRoleId, user.roles[0]);
                const roleId = roleIdResult.rows[0].roleId;
                const createUserRole = `
         INSERT INTO "USER_ROLE"("userId", "roleId") VALUES ($1, $2)
      `;
                yield this.postgres.query(createUserRole, user.id, roleId);
                return new database_1.NoContentDatabaseResult();
            }
            catch (e) {
                const result = new database_1.NoContentDatabaseResult();
                result.setError(100, e.message);
                return result;
            }
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryUser = `
          SELECT * 
          FROM "USER"
          WHERE "userID" = $1
      `;
                const queryResult = yield this.postgres.query(queryUser, id);
                if (queryResult.rows.length === 0) {
                    return new database_1.SingleModelDatabaseResult();
                }
                const user = new users_model_1.User();
                user.id = queryResult.rows[0].userID;
                user.password = queryResult.rows[0].password;
                user.principal = queryResult.rows[0].name;
                user.lastModifiedAt = queryResult.rows[0].lastmodifiedat;
                user.roles = [];
                const queryRoleIds = `
          SELECT * 
          FROM "USER_ROLE"
          WHERE "userId" = $1
      `;
                const roles = yield this.postgres.query(queryRoleIds, user.id);
                const roleIds = roles.rows.map((row) => row.roleId);
                const idPlaceholders = Array.from({ length: roleIds.length }, (_, i) => i + 1)
                    .map((id) => '$' + id)
                    .join(',');
                const queryRoleNames = `
          SELECT * 
          FROM "ROLE"
          WHERE "roleId" in 
      ` + `(${idPlaceholders})`;
                const roleNames = yield this.postgres.query(queryRoleNames, ...roleIds);
                for (let i = 0; i < roleNames.rows.length; i++) {
                    user.roles.push(roleNames.rows[i].roleName);
                }
                return new database_1.SingleModelDatabaseResult(user);
            }
            catch (e) {
                const result = new database_1.SingleModelDatabaseResult();
                result.setError(100, e.message);
                return result;
            }
        });
    }
    readByPrincipal(_principal) {
        return Promise.resolve(undefined);
    }
};
UsersRepository = __decorate([
    tsyringe_1.singleton(),
    __metadata("design:paramtypes", [postgres_data_source_1.PostgresDataSource])
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map