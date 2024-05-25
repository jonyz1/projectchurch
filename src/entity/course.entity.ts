import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Student } from './student.entity';
import { Instructor } from './instructor.entity';
// import { Instructor } from './instructor.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true,nullable:true})
    name: string;

    @ManyToMany(() => Student,(student)=>student.courses,{nullable:true})
    students: Student[];

    @ManyToMany(() => Instructor, instructor => instructor.id,{nullable:true,onDelete:"CASCADE"})
    instructor: Instructor[];

   
}