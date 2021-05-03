"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEtag = void 0;
const etag_1 = __importDefault(require("etag"));
const createEtag = (object) => {
    return etag_1.default(JSON.stringify(object)); // TODO use more performant lib and JSON.stringify() should be avoided
};
exports.createEtag = createEtag;
//# sourceMappingURL=etag-generator.js.map