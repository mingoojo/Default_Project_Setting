import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export default class BoardStatusValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
