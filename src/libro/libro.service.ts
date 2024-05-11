import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './libro.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreateBookDto, CreatedBookResponseDto, RetrieveBookDto, UpdateBookDto } from './dto/libro.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LibroService {
    constructor(
        @InjectRepository(Libro)
        private libroRepository: Repository<Libro>
    ) { }

    async retrieveBook(titulo: string): Promise<RetrieveBookDto[]> {
        const book = await this.libroRepository.find({
            where: {
                titulo: titulo
            },
        });
        if (book.length === 0) throw new NotFoundException('Titulo no encontrado');
        console.log(book);
        return book;
    }

    async retrieveBooks(): Promise<RetrieveBookDto[]> {
        return await this.libroRepository.find();
    }

    

    async create(book: CreateBookDto): Promise<CreatedBookResponseDto> {
        let myuuid = uuidv4();
        console.log(myuuid);
        book.idLibro = uuidv4();
        const bookObj = this.libroRepository.create(book);
        this.libroRepository.save(bookObj);

        return {
            idLibro: book.idLibro,
            titulo: book.titulo
        }
    }

    async updateBook(idLibro: string, updateBookDto: Partial<UpdateBookDto>): Promise<RetrieveBookDto> {

        const bookExist = await this.libroRepository.find({
            where: {
                idLibro: idLibro
            },
        });

        if (bookExist.length === 0) throw new NotFoundException('Este libro no existe');

        bookExist[0].autor === updateBookDto.autor ? updateBookDto.autor : bookExist[0].autor = updateBookDto.autor;
        bookExist[0].calificacion === updateBookDto.calificacion ? updateBookDto.calificacion : bookExist[0].calificacion = updateBookDto.calificacion;
        bookExist[0].descripcion === updateBookDto.descripcion ? updateBookDto.descripcion : bookExist[0].descripcion = updateBookDto.descripcion;
        bookExist[0].editorial === updateBookDto.editorial ? updateBookDto.editorial : bookExist[0].editorial = updateBookDto.editorial;
        bookExist[0].sinopsis === updateBookDto.sinopsis ? updateBookDto.sinopsis : bookExist[0].sinopsis = updateBookDto.sinopsis;
        bookExist[0].titulo === updateBookDto.titulo ? updateBookDto.titulo : bookExist[0].titulo = updateBookDto.titulo;

        const updatedBook = Object.assign(bookExist[0], updateBookDto);

        return await this.libroRepository.save(updatedBook)[0];
    }

    async recomends(): Promise<RetrieveBookDto[]> {

        const books = await this.libroRepository.find({
            where: {
                calificacion: MoreThan(6),
                intercambios: MoreThan(500)
            },
            order: {
                calificacion: "ASC"
            }
        });

        return books;
    }
}
