import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { GradeAttendance } from 'src/entity/grade.entity';
import { Instructor } from 'src/entity/instructor.entity';
import { Student } from 'src/entity/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradeattendService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(GradeAttendance)
        private readonly gradeRepository: Repository<GradeAttendance>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Instructor)
        private readonly instructorrepostory: Repository<Instructor>,
    ){}
    async getgrade(cid: number, sId: number) {
        return this.gradeRepository
          .createQueryBuilder('gradeAttendance')       
          .where('gradeAttendance.courseId = :courseId', { courseId: cid })
          .andWhere('gradeAttendance.studentId = :studentId', { studentId: sId })
          .getOne();
      }
      async create(courseId:number,studentId:number,grade:string){
        let g=new GradeAttendance()
        const course=await this.courseRepository.findOne({where:{id:courseId}})
        const student=await this.studentRepository.findOne({where:{id:studentId}})
        g.course=course;
        g.student=student;
        g.grade=grade;
        
        console.log(g)
        return await this.gradeRepository.save(g);


      }
    async remove(id:number){
        const grade = await this.gradeRepository.findOne({where:{id:id}})
        if (!grade) {
            throw new Error('Course not found ');
          }
          
        //   await this.gradeRepository.save(grade);
console.log(grade,id)
    // // Delete the course entity
    return await this.gradeRepository.delete(id);

    }
    async getattend(cid: number, sId: number){
        const l= await this.gradeRepository
          .createQueryBuilder('gradeAttendance')
          .where('gradeAttendance.courseId = :courseId', { courseId: cid })
          .andWhere('gradeAttendance.studentId = :studentId', { studentId: sId })
          .getOne();
          console.log( l.numberOfClassesAttended)
          return l.numberOfClassesAttended
    }
    async addattend(courseId:number,studentId:number){
        const l= await this.gradeRepository
          .createQueryBuilder('gradeAttendance')
          .where('gradeAttendance.courseId = :courseId', { courseId: courseId })
          .andWhere('gradeAttendance.studentId = :studentId', { studentId: studentId })
          .getOne();
          l.numberOfClassesAttended=l.numberOfClassesAttended+1
          return await this.gradeRepository.save(l)

    }
    async minuse(courseId:number,studentId:number){
        const l= await this.gradeRepository
          .createQueryBuilder('gradeAttendance')
          .where('gradeAttendance.courseId = :courseId', { courseId: courseId })
          .andWhere('gradeAttendance.studentId = :studentId', { studentId: studentId })
          .getOne();
          l.numberOfClassesAttended=l.numberOfClassesAttended-1
          return await this.gradeRepository.save(l)

    }
    async removeattend(courseId:number,studentId:number){
        const l= await this.gradeRepository
          .createQueryBuilder('gradeAttendance')
          .where('gradeAttendance.courseId = :courseId', { courseId: courseId })
          .andWhere('gradeAttendance.studentId = :studentId', { studentId: studentId })
          .getOne();
          l.numberOfClassesAttended=0
          return await this.gradeRepository.save(l)


    }
      
}
