import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities';
import { Credenciales } from 'src/credenciales/entities';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credenciales, Book])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
