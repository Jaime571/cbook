import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

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
    @IsUUID()
    idLibro?: string;

    @IsNotEmpty()
    @IsString()
    titulo?: string

    @IsNotEmpty()
    @IsString()
    editorial?: string

    @IsNotEmpty()
    @IsString()
    descripcion?: string

    @IsNotEmpty()
    @IsString()
    sinopsis?:string

    @IsNotEmpty()
    @IsString()
    autor?: string

    @IsNotEmpty()
    @IsNumber()
    calificacion?: number
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
}