import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Homework } from "./Homework";

@Entity()
export class Exercice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Homework, homework => homework.exercices)
    homeworks: Homework[]
}
