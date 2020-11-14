import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Exercice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    exercice_id: number;
}
