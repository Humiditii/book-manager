import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ZodValidationPipe } from 'src/shared/pipes/validator';

import { BookManagerService } from './book-manager.service';
import { BookDTO } from './dto/book.dto';
import {
  BookResponseDto,
  ValidationFailedResponseDto,
} from './dto/response.dto';
import {
  BookValidator,
  CreateManyBooksValidator,
} from './validations/book.validator';

@ApiTags('Books')
@Controller('books')
export class BookManagerController {
  constructor(private service: BookManagerService) {}

  /**
   * Create new book and return it.
   */
  @ApiCreatedResponse({ description: 'Book created', type: BookResponseDto })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: ValidationFailedResponseDto,
  })
  @UsePipes(new ZodValidationPipe(BookValidator))
  @Post('create')
  async create(@Body() data: BookDTO) {
    return this.service.createBook(data);
  }

  /**
   * Create many books and return
   */
  @ApiCreatedResponse({
    description: 'Books created.',
    type: [BookResponseDto],
  })
  @UsePipes(new ZodValidationPipe(CreateManyBooksValidator))
  @Post('create-many')
  async createMany(@Body() data: [BookDTO]) {
    return this.service.createManyBooks(data);
  }

  /**
   * Return all books
   */
  @ApiOkResponse({ description: 'All books', type: [BookResponseDto] })
  @Get('')
  async allBooks() {
    return this.service.listBooks();
  }

  /**
   * Return all books but sorted in specified order by specified fields
   */
  @ApiOkResponse({ description: 'Sorted books', type: [BookResponseDto] })
  @Get('sort')
  async sortBooks(
    @Query('order') order: 'asc' | 'desc',
    @Query('field') field: keyof BookDTO,
  ) {
    if (!order) {
      throw new BadRequestException('order should be either "asc" or "desc"');
    }
    if (!field) {
      throw new BadRequestException('Specify field to sort with.');
    }
    return this.service.listBooks({ order, field });
  }

  /**
   *Get book titles within a certain price threshold
   */
  @Get('threshold')
  async booksWithinThreshold(@Query('price', ParseIntPipe) price: number) {
    if (!price) {
      throw new BadRequestException('Please specify price threshold');
    }
    return this.service.getBooksForPriceThreshold(price);
  }

  /**
   * Return books filtered by a list of IDs.
   * It should be noted that for this to show as a list you need to have
   * multiple "id" query parameters.
   * e.g = ?id=<id>&id=<id>&id=<id>
   */
  @ApiOkResponse({
    description: 'Books titles returned',
    type: [BookResponseDto],
  })
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

  /**
   * Get one book by id
   */
  @ApiOkResponse({ description: 'Book retrieved', type: BookResponseDto })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @Get(':id')
  async oneBook(@Param('id') id: string) {
    return this.service.oneBook(id);
  }

  /**
   *Update book by id
   */
  @ApiOkResponse({ description: 'Book Updated', type: BookResponseDto })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: ValidationFailedResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @UsePipes(new ZodValidationPipe(BookValidator))
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BookDTO) {
    return this.service.updateBook(id, data);
  }

  /**
   * Delete book by id
   */
  @ApiOkResponse({ description: 'Book Deleted', type: BookResponseDto })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.service.deleteBook(id);
  }
}
