"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeFormatAttr = void 0;
function timeFormatAttr(time) {
    return `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time
        .getDate()
        .toString()
        .padStart(2, '0')}`;
}
exports.timeFormatAttr = timeFormatAttr;
//# sourceMappingURL=timeFormatAttr.js.map