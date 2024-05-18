import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities';
import { Credenciales } from 'src/credenciales/entities';
import { Book } from 'src/books/entities/book.entity';
import { UploadService } from 'src/upload/upload.service';
import { CredencialesModule } from 'src/credenciales/credenciales.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credenciales, Book]),
    BooksModule,
    CredencialesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UploadService],
  exports: [UsersModule, UsersService],
})
export class UsersModule {}
