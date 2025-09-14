export function timeFormatAttr(time: Date) {
  return `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time
    .getDate()
    .toString()
    .padStart(2, '0')}`;
}
