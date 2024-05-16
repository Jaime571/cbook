import { IsNotEmpty } from "class-validator";
import { User } from "src/users/entities";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Libro } from "./libro.entity";

@Entity()
export class UserLibro {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.codigo)
    user: User

    @ManyToOne(() => Libro, (libro) => libro.idLibro)
    libro: Libro

    @Column({ default: true })
    @IsNotEmpty()
    disponible: boolean
}