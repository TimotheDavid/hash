import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    message_subject: string;

    @ManyToMany(() => User)
    @JoinTable()
    teacher: User[];

    @ManyToMany(() => User)
    @JoinTable()
    student: User[];
}
