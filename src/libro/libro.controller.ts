import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateBookDto, CreatedBookResponseDto, LinkReferencesDto, RetrieveBookDto, UpdateBookDto } from './dto/libro.dto';
import { UsersService } from 'src/users/users.service';

@Controller('libro')
export class LibroController {
    constructor(private libroService: LibroService) { }

    @Post('/crear')
    create(@Body() body: CreateBookDto): Promise<CreatedBookResponseDto> {
        return this.libroService.create(body);
    }

    @Post('/registrar/libroUsuario')
    createLinkBetweenBookUser(@Body() body: LinkReferencesDto): Promise<CreatedBookResponseDto> {
        return this.libroService.linkBookToUser(body);
    }

    @Get('/buscar/:titulo')
    findOne(@Param('titulo') titulo: string): Promise<RetrieveBookDto[]> {
        return this.libroService.retrieveBook(titulo);
    }

    @Get('/buscar')
    findAll(): Promise<RetrieveBookDto[]> {
        return this.libroService.retrieveBooks();
    }

    @Get('/recomendados')
    findAllRecomends(): Promise<RetrieveBookDto[]> {
        return this.libroService.recomends();
    }

    @Patch('/buscar/:id')
    updateBook(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto
    ): Promise<RetrieveBookDto> {
        return this.libroService.updateBook(id, updateBookDto);
    }
}
