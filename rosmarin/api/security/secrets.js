"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = void 0;
const crypto_1 = require("crypto");
// https://github.com/dwyl/hapi-auth-jwt2#generating-your-secret-key
exports.jwtSecret = process.env.JWT_SECRET || crypto_1.randomBytes(256).toString('base64');
//# sourceMappingURL=secrets.js.map