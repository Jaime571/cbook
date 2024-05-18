import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities';
import { Book } from './entities/book.entity';
import { UsersService } from 'src/users/users.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book])],
  controllers: [BooksController],
  providers: [BooksService, UsersService, UploadService],
})
export class BooksModule {}
