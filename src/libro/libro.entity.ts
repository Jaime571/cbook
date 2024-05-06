import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}