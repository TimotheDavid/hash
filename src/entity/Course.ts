import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Classroom } from "./Classroom";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "date" })
    start_date: Date;

    @Column({ type: "date" })
    end_date: Date;

    @ManyToMany(type => Classroom, Classroom => Classroom.courses)
    classrooms: Classroom[]


}
