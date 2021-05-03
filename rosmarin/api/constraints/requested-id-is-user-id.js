"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfRequestedIdIsUserId = void 0;
function checkIfRequestedIdIsUserId() {
    return this.requestedId == this.authenticationInfo.userModel.id;
}
exports.checkIfRequestedIdIsUserId = checkIfRequestedIdIsUserId;
//# sourceMappingURL=requested-id-is-user-id.js.map