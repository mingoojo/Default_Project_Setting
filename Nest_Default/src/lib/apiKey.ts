import * as crypto from 'crypto';

export function createAPIKey(email) {
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
