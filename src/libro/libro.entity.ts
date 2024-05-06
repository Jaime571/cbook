import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserLibro } from "./user_libro.entity";

@Entity()
export class Libro {
    @PrimaryGeneratedColumn('uuid')
    idLibro: string;

    @Column()
    @IsNotEmpty()
    titulo: string

    @Column()
    @IsNotEmpty()
    editorial: string

    @Column()
    @IsNotEmpty()
    descripcion: string

    @Column()
    @IsNotEmpty()
    sinopsis:string

    @Column()
    @IsNotEmpty()
    autor: string

    @Column()
    @IsNotEmpty()
    calificacion: number

    @OneToMany(() => UserLibro, (libroUser) => libroUser.user)
    users: UserLibro[]
}