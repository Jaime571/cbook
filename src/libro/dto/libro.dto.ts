import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { User } from "src/users/entities";
import { Libro } from "../libro.entity";
import { UserLibro } from "../user_libro.entity";

export class CreateBookDto {
    
    idLibro: string;

    @IsNotEmpty()
    @IsString()
    titulo: string

    @IsNotEmpty()
    @IsString()
    editorial: string

    @IsNotEmpty()
    @IsString()
    descripcion: string

    @IsNotEmpty()
    @IsString()
    sinopsis:string

    @IsNotEmpty()
    @IsString()
    autor: string

    @IsNotEmpty()
    @IsNumber()
    calificacion: number
    
    @IsNotEmpty()
    @IsNumber()
    intercambios: number
}

export class CreatedBookResponseDto {
    @IsNotEmpty()
    @IsUUID()
    idLibro: string;

    @IsNotEmpty()
    @IsString()
    titulo: string
}

export class RetrieveBookDto {
    
    @IsNotEmpty()
    idLibro: string;

    @IsNotEmpty()
    @IsString()
    titulo: string

    @IsNotEmpty()
    @IsString()
    editorial: string

    @IsNotEmpty()
    @IsString()
    descripcion: string

    @IsNotEmpty()
    @IsString()
    sinopsis:string

    @IsNotEmpty()
    @IsString()
    autor: string

    @IsNotEmpty()
    @IsNumber()
    calificacion: number

    @IsNotEmpty()
    @IsNumber()
    intercambios: number

    users: UserLibro[]
}

export class UpdateBookDto {

    // @IsNotEmpty()
    @IsString()
    titulo?: string

    // @IsNotEmpty()
    @IsString()
    editorial?: string

    // @IsNotEmpty()
    @IsString()
    descripcion?: string

    // @IsNotEmpty()
    @IsString()
    sinopsis?:string

    // @IsNotEmpty()
    @IsString()
    autor?: string

    // @IsNotEmpty()
    @IsNumber()
    calificacion?: number

    // @IsNotEmpty()
    @IsNumber()
    intercambios?: number
}

export class LinkReferencesDto {

    // @IsNotEmpty()
    @IsString()
    user?: string

    // @IsNotEmpty()
    @IsString()
    libro?: string
}

export class PayloadLinkReferencesDto {

    // @IsNotEmpty()
    @IsString()
    user?: User

    // @IsNotEmpty()
    @IsString()
    libro?: Libro
}