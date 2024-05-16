import { Credenciales } from 'src/credenciales/entities';
import { Libro } from 'src/libro/libro.entity';
import { UserLibro } from 'src/libro/user_libro.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @Column({ nullable: false })
  strikes: number;

  @Column({ nullable: false })
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
  @OneToMany(() => UserLibro, (userLibro) => userLibro.libro, { cascade: ['insert', 'update'] })
  libros: UserLibro[]
}
