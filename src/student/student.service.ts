import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { Course } from 'src/entity/course.entity';
import { GradeAttendance } from 'src/entity/grade.entity';
import { Instructor } from 'src/entity/instructor.entity';
// import { Course } from 'src/entity/course.entity';
// import { GradeAttendance } from 'src/entity/grade.entity';
// import { Instructor } from 'src/entity/instructor.entity';
import { Student } from 'src/entity/student.entity';
import { Repository } from 'typeorm';
import { createstudentdto } from './dto/create-student-dto';


@Injectable()
export class StudentService {
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
    getgrade(){

    }
    async get(){
        return await this.studentRepository.find();

    }
    async getstudentid(id:number){
        return this.studentRepository.findOne({ where: { id: id } })


    }
    async createstudent(student:createstudentdto){
        let s=new Student()
    
        s.name=student.name;
        s.dateOfBirth=student.dateofbirth;
        s.gender=student.dateofbirth;
        
        console.log(s)
        return await this.studentRepository.save(s);
    }
    
    async getlistofcourse(studentId:number){
        console.log("get list of student")
        // return await this.courseRepository.createQueryBuilder('c')
        // .innerJoin('c.students', 's')
        // .where('s.id = :studentId', { studentId })
        // .getMany();
        const student= await this.studentRepository.findOne({where:{id:studentId},relations:{courses:true}})
        return student.courses
    }

    async addcoursetostudent(courseId:number,studentId:number){
        const student = await this.studentRepository.findOne({where:{id:studentId},relations:{
            courses:true
        }})
        const course = await this.courseRepository.findOne({where:{id:courseId}})
        if(!course ||!student){
            console.log("no such thing")
        }
        else{
            console.log(student)
            console.log(student.courses)
            if(!student.courses){
                student.courses=[course]        
            }
            else{
                student.courses.push(course)
            }
        }
        this.studentRepository.save(student)
    }
    
    async deletestudent(studentId:number){
        const student = await this.studentRepository.findOne({where:{id:studentId}})
        if (!student) {
            throw new Error('Course not found ');
          }
          await this.studentRepository.save(student);
console.log(student)
    // // Delete the course entity
    await this.studentRepository.delete(studentId);
    }


    async resgin(courseId:number,studentId:number){
        const course = await this.courseRepository.findOne({where:{id:courseId}});
    const student = await this.studentRepository.findOne({
      relations: {
          courses: true,
      },
      where:{
        id:studentId,
      }
  })
  if(!student || !course){
    throw new Error('Course or student not found   ');
  }
  console.log(student)
  console.log("ldsjbgbsjnj")
  console.log(student.courses[0])
  console.log(courseId)
  student.courses=student.courses.filter(c=> c.id !==course.id)
  console.log(student.courses.filter(c=> c!==course))
    console.log(student.courses)

    

  
  return await this.studentRepository.save(student);

    }



     


}
