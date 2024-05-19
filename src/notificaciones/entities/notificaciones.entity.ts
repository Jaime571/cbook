import { User } from 'src/users/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('notificaciones')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  idNotificacion: string;

  @Column({ nullable: false })
  mensaje: string;

  @Column({ default: false })
  resuelto: boolean;

  @ManyToOne(() => User, (user) => user.notificaciones)
  user: User;
}
