import { ApiProperty } from '@nestjs/swagger';

export class BookDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;
}
