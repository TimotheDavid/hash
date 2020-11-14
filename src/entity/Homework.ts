import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Exercice } from "./Exercice";
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

    @ManyToMany(() => Exercice)
    @JoinTable()
    exercices: Exercice[];


}
