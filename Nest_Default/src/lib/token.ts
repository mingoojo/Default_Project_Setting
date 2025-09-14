export function encodeBase64(text: string) {
  return Buffer.from(text, 'utf8').toString('base64');
}

export function decodeBase64(encodedText: string) {
  return Buffer.from(encodedText, 'base64').toString('utf8');
}
