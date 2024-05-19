import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/books/entities';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const { codigo, idLibro } = createWishlistDto;
    const ListElement = new Wishlist();
    ListElement.codigoUsuario = codigo;
    ListElement.idDelLibro = idLibro;
    return await this.wishlistRepository.save(ListElement);
  }

  async findUserWishList(codigo: string) {
    const elementos = await this.wishlistRepository.find({
      where: {
        codigoUsuario: codigo,
      },
    });
    if (!elementos || elementos.length === 0) {
      throw new NotFoundException('Lista de libros deseados no encontrada');
    }
    const librosPromises = elementos.map(async (elemento) => {
      const libro = await this.bookRepository.findOne({
        where: {
          idLibro: elemento.idDelLibro,
        },
        relations: {
          user: true,
        },
      });
      return libro;
    });

    // Esperamos que todas las consultas se completen
    const libros = await Promise.all(librosPromises);

    return libros;
  }

  async borrar(createWishlistDto: CreateWishlistDto) {
    const { codigo, idLibro } = createWishlistDto;
    const elemento = await this.wishlistRepository.findOne({
      where: {
        codigoUsuario: codigo,
        idDelLibro: idLibro,
      },
    });
    return await this.wishlistRepository.remove(elemento);
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
