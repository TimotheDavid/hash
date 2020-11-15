import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "./User";
import { Homework } from "./Homework";
import { Subject } from "./Subject";
import { Course } from "./Course";
@Entity()
export class Classroom {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User, user => user.id)
    @JoinTable()
    users: User[];

    @ManyToMany(() => Course, course => course.id)
    @JoinTable()
    courses: Course[];

    @OneToMany(() => Homework, homework => homework.id)
    homework: Homework;

    @OneToMany(() => Subject, subject => subject.id)
    subject: Subject;

}
