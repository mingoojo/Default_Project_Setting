"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = exports.encodeBase64 = void 0;
function encodeBase64(text) {
    return Buffer.from(text, 'utf8').toString('base64');
}
exports.encodeBase64 = encodeBase64;
function decodeBase64(encodedText) {
    return Buffer.from(encodedText, 'base64').toString('utf8');
}
exports.decodeBase64 = decodeBase64;
//# sourceMappingURL=token.js.map