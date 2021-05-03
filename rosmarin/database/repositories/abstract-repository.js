"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
const tsyringe_1 = require("tsyringe");
const constants_1 = __importDefault(require("../../constants"));
class AbstractRepository {
    constructor() {
        this.logger = tsyringe_1.container
            .resolve(constants_1.default.LOGGER)
            .child({ context: this.constructor.name });
    }
}
exports.AbstractRepository = AbstractRepository;
//# sourceMappingURL=abstract-repository.js.map