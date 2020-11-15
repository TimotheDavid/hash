import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from "typeorm";
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

    @ManyToMany(() => Role)
    @JoinColumn()
    roles: Role[]



}
