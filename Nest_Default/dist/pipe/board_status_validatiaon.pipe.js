"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoardStatusValidationPipe {
    transform(value, metadata) {
        console.log(value);
        console.log(metadata);
        return value;
    }
}
exports.default = BoardStatusValidationPipe;
//# sourceMappingURL=board_status_validatiaon.pipe.js.map