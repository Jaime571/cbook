import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Credenciales {
  @PrimaryColumn()
  codigo: string;

  @Column()
  password: string;

  @Column()
  correo: string;
}
