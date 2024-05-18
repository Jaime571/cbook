import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities';
import { Book } from './entities/book.entity';
import { UsersService } from 'src/users/users.service';
import { UploadService } from 'src/upload/upload.service';
import { CredencialesService } from 'src/credenciales/credenciales.service';
import { CredencialesModule } from 'src/credenciales/credenciales.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book]), CredencialesModule],
  controllers: [BooksController],
  providers: [BooksService, UsersService, UploadService, CredencialesService],
  exports: [],
})
export class BooksModule {}
