import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Book } from 'src/books/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Book])],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [TypeOrmModule, WishlistService],
})
export class WishlistModule {}
