import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './libro.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreateBookDto, CreatedBookResponseDto, LinkReferencesDto, PayloadLinkReferencesDto, RetrieveBookDto, UpdateBookDto } from './dto/libro.dto';

import { v4 as uuidv4 } from 'uuid';
import { UserLibro } from './user_libro.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities';

@Injectable()
export class LibroService {
    constructor(
        @InjectRepository(Libro)
        private libroRepository: Repository<Libro>,
        @InjectRepository(UserLibro)
        private libroUserRepository: Repository<UserLibro>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async retrieveBook(titulo: string): Promise<RetrieveBookDto[]> {
        const book = await this.libroRepository.find({
            where: {
                titulo: titulo
            },
        });
        if (book.length === 0) throw new NotFoundException('Titulo no encontrado');
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

    async linkBookToUser(creds: LinkReferencesDto): Promise<string>{

        let obj: PayloadLinkReferencesDto;
        let libro = await this.retrieveBook(creds.libro);
        let user =  await this.findOne(creds.user);

        // console.log(JSON.stringify(libro));
        // console.log(JSON.stringify(user));
        
        obj = {
            user: user,
            libro: libro[0]
        };
        // console.log(JSON.stringify(obj));

        const credsObj = this.libroUserRepository.create(obj);
        const Obj = this.libroUserRepository.save(credsObj);

        return 'ok';
    }

    async findOne(codigo: string): Promise<User> {
        let user: User;
        try {
          user = await this.userRepository.findOne({ where: { codigo } });
        } catch (error) {
          throw new InternalServerErrorException(
            'Server failed to search for the user',
          );
        }
        if (!user) {
          throw new NotFoundException('User not found in database');
        }
        return user;
      }
}
