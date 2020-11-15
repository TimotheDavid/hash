import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from "typeorm";
import { User } from "./User";
@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[]

}
