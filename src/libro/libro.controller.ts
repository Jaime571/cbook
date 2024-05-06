import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateBookDto, CreatedBookResponseDto, RetrieveBookDto, UpdateBookDto } from './dto/libro.dto';

@Controller('libro')
export class LibroController {
    constructor(private libroService: LibroService) { }

    @Post('/crear')
    create(@Body() body: CreateBookDto): Promise<CreatedBookResponseDto> {
        return this.libroService.create(body);
    }

    @Get('/buscar/:titulo')
    findOne(@Param('titulo') titulo: string): Promise<RetrieveBookDto[]> {
        return this.libroService.retrieveBook(titulo);
    }

    @Get('/buscar')
    findAll(): Promise<RetrieveBookDto[]> {
        return this.libroService.retrieveBooks();
    }

    @Patch('/buscar/:id')
    updateBook(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto
    ): Promise<RetrieveBookDto> {
        return this.libroService.updateBook(id, updateBookDto);
    }
}
