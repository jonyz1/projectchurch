import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { GradeAttendance } from 'src/entity/grade.entity';
import { Instructor } from 'src/entity/instructor.entity';
import { Student } from 'src/entity/student.entity';
import { createstudentdto } from 'src/student/dto/create-student-dto';
import { Repository } from 'typeorm';
import { createinstructuredto } from './dto/create-instructure-dto';

@Injectable()
export class InstructorService {
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
    async get(){
        return await this.instructorrepostory.find();
    }
    async getinstructorid(id:number){
        return this.instructorrepostory.findOne({ where: { id: id } })
    }
    async createinstructor(instructor:createinstructuredto){
        let i=new Instructor()
        i.name=instructor.name;
        console.log(i)
        return await this.instructorrepostory.save(i);
    }
    async getlistofcourse(courseId:number){
        console.log("get list of course ")
        // return await this.courseRepository.createQueryBuilder('c')
        // .innerJoin('c.students', 's')
        // .where('s.id = :studentId', { studentId })
        // .getMany();
        const student= await this.instructorrepostory.findOne({where:{id:courseId},relations:{courses:true}})
        return student.courses
    }

    async addinstructortocourse(courseId:number,instructorId:number){
        const instructor = await this.instructorrepostory.findOne({where:{id:instructorId},relations:{
            courses:true
        }})
        const course = await this.courseRepository.findOne({where:{id:courseId}})
        if(!course ||!instructor){
            console.log("no such thing")
        }
        else{
            console.log(instructor)
            console.log(instructor.courses)
            if(!instructor.courses){
                instructor.courses=[course]        
            }
            else{
                instructor.courses.push(course)
            }
        }
        return this.instructorrepostory.save(instructor)
    }

    
    async resgin(courseId:number,instructorId:number){
        const course = await this.courseRepository.findOne({where:{id:courseId}});
    const instructor = await this.instructorrepostory.findOne({
      relations: {
          courses: true,
      },
      where:{
        id:instructorId,
      }
  })
  if(!instructor || !course){
    throw new Error('Course or student not found   ');
  }
  console.log(instructor)
  console.log("ldsjbgbsjnj")
  console.log(instructor.courses[0])
  console.log(courseId)
  instructor.courses=instructor.courses.filter(c=> c.id !==course.id)
  console.log(instructor.courses.filter(c=> c!==course))
    console.log(instructor.courses)  
  return await this.instructorrepostory.save(instructor);
    }


    async deleteinstructor(instructorId:number){
        const instructor = await this.instructorrepostory.findOne({where:{id:instructorId}})
        if (!instructor) {
            throw new Error('Course not found ');
          }
          
          await this.instructorrepostory.save(instructor);
console.log(instructor,instructorId)
    // // Delete the course entity
    return await this.instructorrepostory.delete(instructorId);
    }

}
