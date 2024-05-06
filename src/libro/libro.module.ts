import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './libro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  exports: [TypeOrmModule, LibroService],
  providers: [LibroService],
  controllers: [LibroController]
})
export class LibroModule {}
