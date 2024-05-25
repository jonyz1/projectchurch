import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Instructor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Course, {onDelete:"CASCADE"})
    @JoinTable({ name: 'instructorcourse' })
    courses: Course[];
}
