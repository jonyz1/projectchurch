import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    dateOfBirth: string;

    @Column({ nullable: true })
    gender: string;
   
  
    @ManyToMany(() => Course,{onDelete:"CASCADE"})
    @JoinTable({ name: 'studentcourse' })
    courses: Course[];
}

