import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post(':userCode')
  create(
    @Body() createBookDto: CreateBookDto,
    @Param('userCode') userCode: string,
  ) {
    return this.booksService.create(createBookDto, userCode);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get('for/:codigo')
  findBooksFor(@Param('codigo') codigo: string) {
    return this.booksService.findUserBooks(codigo);
  }

  @Patch(':idLibro')
  update(
    @Param('idLibro') idLibro: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(idLibro, updateBookDto);
  }

  @Delete(':idLibro')
  remove(@Param('idLibro') idLibro: string) {
    return this.booksService.remove(idLibro);
  }

  @Post('/sumarIntercambio/:idLibro')
  sumarIntercambio(@Param('idLibro') idLibro: string) {
    return this.booksService.sumarIntercambio(idLibro);
  }

  @Get('/byTitle/:cadena')
  getBooksByTitle(@Param('cadena') cadena: string) {
    return this.booksService.getBooksByTitle(cadena);
  }
}
