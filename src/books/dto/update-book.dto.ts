import { IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  titulo: string;

  @IsString()
  @IsOptional()
  editorial: string;

  @IsString()
  @IsOptional()
  autor: string;

  @IsString()
  @IsOptional()
  sinopsis: string;
}