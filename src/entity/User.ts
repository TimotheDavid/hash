import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Homework } from "./Homework";
import { Message } from "./Message";
import { Role } from "./Role";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    score: number;

    @Column({default: ""})
    access_token: string;

    @ManyToMany(() => Homework, homework => homework.users)
    homeworks: Homework[]

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles: Role[]

    @ManyToMany(() => Message, message => message.users)
    @JoinTable()
    messages: Message[];

}
