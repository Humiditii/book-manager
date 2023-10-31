import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from 'src/shared/pipes/validator';

import { BookManagerService } from './book-manager.service';
import { BookDTO } from './dto/book.dto';
import { BookValidator } from './validations/book.validator';

@ApiTags('Books')
@Controller('books')
export class BookManagerController {
  constructor(private service: BookManagerService) {}

  @UsePipes(new ZodValidationPipe(BookValidator))
  @Post('create')
  async create(@Body() data: BookDTO) {
    return this.service.createBook(data);
  }

  @Get('')
  async allBooks() {
    return this.service.listBooks();
  }

  @Get(':id')
  async oneBook(@Param('id') id: string) {
    return this.service.oneBook(id);
  }

  @UsePipes(new ZodValidationPipe(BookValidator))
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BookDTO) {
    return this.service.updateBook(id, data);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.service.deleteBook(id);
  }
}
