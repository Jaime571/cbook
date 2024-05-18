import { Book } from 'src/books/entities/book.entity';
import { Credenciales } from 'src/credenciales/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ nullable: false })
  codigo: string;

  @Column({ nullable: false })
  nombre: string;

  @Column({ default: 0 })
  strikes: number;

  @Column({ nullable: false })
  imagenCredencial: string;

  @Column({ default: null })
  imagenPerfil: string;

  @CreateDateColumn({ nullable: false })
  creadoEn: Date;

  @UpdateDateColumn({ nullable: false })
  actualizadoEn: Date;

  @OneToOne(() => Credenciales, (credencial) => credencial.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'codigo' })
  credenciales: Credenciales;

  //implementar relacion con libros
  @OneToMany(() => Book, (book) => book.user)
  libros: Book[];
}
