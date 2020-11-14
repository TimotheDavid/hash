import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "./User";
import { Homework } from "./Homework";
import { Subject } from "./Subject";
@Entity()
export class Classroom {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @OneToMany(() => Homework, homework => homework.id)
    homework: Homework;

    @OneToMany(() => Subject, subject => subject.id)
    subject: Subject;


}
