"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeConverter = void 0;
function timeConverter(time) {
    return `${time.getFullYear()}${(time.getMonth() + 1).toString().padStart(2, '0')}${time
        .getDate()
        .toString()
        .padStart(2, '0')}${time.getHours().toString().padStart(2, '0')}${time
        .getMinutes()
        .toString()
        .padStart(2, '0')}${time.getSeconds().toString().padStart(2, '0')}`;
}
exports.timeConverter = timeConverter;
//# sourceMappingURL=timeConverter.js.map