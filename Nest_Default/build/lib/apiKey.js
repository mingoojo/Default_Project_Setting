"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAPIKey = void 0;
const crypto = require("crypto");
function createAPIKey(email) {
    const salt = crypto.randomBytes(128).toString('base64');
    const apikey = crypto
        .createHash('sha512')
        .update(salt + email)
        .digest('base64');
    const secretSalt = crypto.randomBytes(128).toString('base64');
    const secretKey = crypto
        .createHash('sha512')
        .update(secretSalt + apikey + Date.now())
        .digest('base64');
    return [secretKey, apikey];
}
exports.createAPIKey = createAPIKey;
//# sourceMappingURL=apiKey.js.map