import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Exercice } from "./Exercice";
import { User } from "./User";
@Entity()
export class Homework {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "date" })
    start_date: Date;

    @Column({ type: "date" })
    end_date: Date;

    @Column({ type: "date" })
    show_date: Date

    @ManyToMany(type => Exercice, exercice => exercice.homeworks)
    @JoinTable()
    exercices: Exercice[];

    @ManyToMany(type => User, user => user.homeworks)
    @JoinTable()
    users: User[];


}
