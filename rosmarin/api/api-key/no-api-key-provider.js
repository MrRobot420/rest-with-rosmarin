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
exports.NoApiKeyProvider = void 0;
const api_key_info_1 = require("./api-key-info");
class NoApiKeyProvider {
    get(_) {
        return __awaiter(this, void 0, void 0, function* () {
            return new api_key_info_1.ApiKeyInfo(true);
        });
    }
}
exports.NoApiKeyProvider = NoApiKeyProvider;
//# sourceMappingURL=no-api-key-provider.js.map