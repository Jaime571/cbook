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
    sinopsis: string

    @Column()
    @IsNotEmpty()
    autor: string

    @Column()
    @IsNotEmpty()
    calificacion: number

    @Column({ default: 0 })
    @IsNotEmpty()
    intercambios: number

    @OneToMany(() => UserLibro, (libroUser) => libroUser.user)
    users: UserLibro[]
}



// INSERT INTO libro(titulo, editorial, descripcion, sinopsis, autor, calificacion, intercambios) VALUES
//     ('El Gran Gatsby', 'Ediciones Modernas', 'Novela', 'Jay Gatsby, un enigmático millonario, organiza suntuosas fiestas en busca de su amor perdido.', 'F. Scott Fitzgerald', 7, 789),
//     ('Orgullo y Prejuicio', 'Editorial Clásica', 'Romance', 'Elizabeth Bennet y Mr. Darcy luchan contra sus propios prejuicios mientras se enamoran.', 'Jane Austen', 6, 632),
//     ('Cien años de soledad', 'Ediciones Latinas', 'Novela', 'Gabriel García Márquez teje una saga épica llena de realismo mágico y personajes inolvidables.', 'Gabriel García Márquez', 4.9, 923),
//     ('1984', 'Ediciones Futuras', 'Ciencia Ficción', 'Winston Smith lucha por la libertad en un mundo gobernado por el Gran Hermano.', 'George Orwell', 8, 555),
//     ('La sombra del viento', 'Ediciones Mágicas', 'Ciencia Ficción', 'Daniel Sempere descubre un libro maldito que cambiará su vida para siempre.', 'Carlos Ruiz Zafón', 8, 721),
//     ('Harry Potter y la piedra filosofal', 'Ediciones Mágicas', 'Fantasía', 'Harry descubre que es un mago y se embarca en una emocionante búsqueda.', 'J.K. Rowling', 9, 987),
//     ('Matar un ruiseñor', 'Ediciones Clásicas', 'Novela', 'La joven Scout Finch aprende lecciones valiosas de su padre abogado, Atticus Finch.', 'Harper Lee', 7, 422),
//     ('Crónica de una muerte anunciada', 'Ediciones Latinoamericanas', 'Novela', 'Gabriel García Márquez relata un crimen y sus complejas circunstancias.', 'Gabriel García Márquez', 6, 375),
//     ('Rebelión en la granja', 'Ediciones Revolucionarias', 'Fábula', 'Animales de una granja se rebelan contra sus opresores humanos, solo para enfrentar nuevas tiranías.', 'George Orwell', 5, 821),
//     ('El retrato de Dorian Gray', 'Editorial Victoriana', 'Fantasía', 'Oscar Wilde explora la decadencia moral en la sociedad victoriana.', 'Oscar Wilde', 9, 643),
//     ('Don Quijote de la Mancha', 'Ediciones Clásicas', 'Novela', 'Miguel de Cervantes crea un clásico universal lleno de humor y profundidad.', 'Miguel de Cervantes', 6, 978),
//     ('Anna Karenina', 'Editorial Rusa', 'Romance', 'La pasión prohibida entre Anna y Vronsky lleva a consecuencias desastrosas.', 'León Tolstói', 8, 542),
//     ('El hobbit', 'Editorial Fantástica', 'Fantasía', 'J.R.R. Tolkien introduce a los lectores al mundo de la Tierra Media.', 'J.R.R. Tolkien', 7, 675),
//     ('El principito', 'Ediciones Infantiles', 'Cuento', 'Antoine de Saint-Exupéry explora el significado de la amistad y el amor.', 'Antoine de Saint-Exupéry', 9, 356),
//     ('Los miserables', 'Ediciones Revolucionarias', 'Novela', 'Jean Valjean escapa de su pasado para ayudar a otros en una sociedad despiadada.', 'Victor Hugo', 6, 894);
//         ('El Señor de los Anillos', 'Editorial Épica', 'Fantasía', 'J.R.R. Tolkien crea un mundo vibrante lleno de criaturas y culturas fantásticas.', 'J.R.R. Tolkien', 4.9, 1050),
