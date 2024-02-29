import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.Schema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const result = this.schema.safeParse(value);
      if (result.success === true) {
        return result.data;
      } else {
        const error = result.error.flatten();
        throw new BadRequestException({
          errors: error.fieldErrors,
          formError: error.formErrors,
          message: 'Validation failed.',
        });
      }
    } else {
      return value;
    }
  }
}
