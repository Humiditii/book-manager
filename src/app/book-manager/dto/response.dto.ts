import { ApiProperty } from '@nestjs/swagger';
import { Book as DbBook } from 'src/shared/db';

export class BookResponseDto implements DbBook {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;
}

class FieldValidationErrors {
  @ApiProperty()
  title?: [string];

  @ApiProperty()
  price?: [string];
}

export class ValidationFailedResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  formError: string;

  @ApiProperty()
  errors: FieldValidationErrors;
}
