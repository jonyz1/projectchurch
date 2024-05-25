import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from './student.entity';
import { Course } from './course.entity';

@Entity()
export class GradeAttendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    grade: string;

    @Column({nullable:true})
    numberOfClassesAttended: number;

    @ManyToOne(() => Student, student => student.id,{nullable:true})
    student: Student;

    @ManyToOne(() => Course, course => course.id,{nullable:true})
    course: Course;

    

   
}