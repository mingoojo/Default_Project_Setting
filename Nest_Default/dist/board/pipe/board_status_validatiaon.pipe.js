'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const common_1 = require('@nestjs/common');
class BoardStatusValidationPipe {
  constructor() {
    this.StatusOption = ['PUBLIC', 'PRIVATE'];
  }
  transform(value, metadata) {
    console.log(value);
    console.log(metadata);
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new common_1.BadRequestException(`${value} isn't in the statusOptions`);
    }
    return value;
  }
  isStatusValid(status) {
    const index = this.StatusOption.indexOf(status);
    return index !== -1;
  }
}
exports.default = BoardStatusValidationPipe;
//# sourceMappingURL=board_status_validatiaon.pipe.js.map
