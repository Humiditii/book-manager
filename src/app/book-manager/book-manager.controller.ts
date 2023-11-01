import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from 'src/shared/pipes/validator';

import { BookManagerService } from './book-manager.service';
import { BookDTO } from './dto/book.dto';
import {
  BookValidator,
  CreateManyBooksValidator,
} from './validations/book.validator';
import { array } from 'zod';

@ApiTags('Books')
@Controller('books')
export class BookManagerController {
  constructor(private service: BookManagerService) {}

  @UsePipes(new ZodValidationPipe(BookValidator))
  @Post('create')
  async create(@Body() data: BookDTO) {
    return this.service.createBook(data);
  }

  @UsePipes(new ZodValidationPipe(CreateManyBooksValidator))
  @Post('create-many')
  async createMany(@Body() data: [BookDTO]) {
    return this.service.createManyBooks(data);
  }

  @Get('')
  async allBooks() {
    return this.service.listBooks();
  }

  @Get('threshold')
  async booksWithinThreshold(@Query('price', ParseIntPipe) price: number) {
    if (!price) {
      throw new BadRequestException('Please specify price threshold');
    }
    return this.service.getBooksForPriceThreshold(price);
  }

  @Get('books-by-id')
  async getMultipleBooksById(@Query('id') id: [string]) {
    if (!Array.isArray(id)) {
      throw new BadRequestException('Please pass a list of id.');
    }
    if (id.length < 1) {
      throw new BadRequestException('Please specify id of books to return');
    }
    return this.service.getBooksWithId(id);
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
