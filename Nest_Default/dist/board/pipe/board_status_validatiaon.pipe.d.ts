import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export default class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption: string[];
  transform(value: any, metadata: ArgumentMetadata): any;
  private isStatusValid;
}
