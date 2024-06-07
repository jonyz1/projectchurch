import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { elementAt } from 'rxjs';
import { createcoursedto } from 'src/courses/dto/create-course-dto';
import { grade } from 'src/dto/grade-dto';
import { Course } from 'src/entity/course.entity';
import { GradeAttendance } from 'src/entity/grade.entity';
import { Instructor } from 'src/entity/instructor.entity';
import { Student } from 'src/entity/student.entity';
import { Not, Repository, createQueryBuilder, getConnection } from 'typeorm';

@Injectable()
export class CoursesService {
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
        
// /courses
// /get all courses
// /post add course 
// /get course by id 
// /transfer course student to this course 
// /get list of student attending the courseid
// /add student to course 
// /remove student from ciurse 
// / add instructor 
// /get instructor of this course
// /chnage instrucutre of course
// /remove course 
// /redirect to the student info page 
async getallcourse(){
  // const g:GradeAttendance=new GradeAttendance()
  // g.grade="a"
  // this.gradeRepository.save(g)
    return await this.courseRepository.find();
}
addcourse(create:createcoursedto){
    let c=new Course()
    
    c.name=create.coursename
    console.log(c)
    return this.courseRepository.save(c);
}

getbyid(id1:number){
    return this.courseRepository.findOne({ where: { id: id1 } })
}
async getlistofstudent(courseId:number){
  console.log(courseId)
    // return await this.courseRepository.createQueryBuilder('course')
    //   .leftJoinAndSelect('course.students', 'student')
    //   .where('course.id = :courseId', { id:courseId })
    //   .getOne();
      return await this.studentRepository.createQueryBuilder('s')
        .innerJoin('s.courses', 'c')
        .where('c.id = :courseId', { courseId })
        .getMany();

}
async addStudentToCourse(courseId: number, studentId: number): Promise<void|Student> {
  console.log()
    const course = await this.courseRepository.createQueryBuilder('course')
    .where('course.id = :courseId', { courseId })
    .getOne();

    console.log(course)
    // const student = await this.studentRepository.findOne({where:{id:studentId}});
    const student = await this.studentRepository.findOne({
      relations: {
          courses: true,
      },
      where:{id:studentId}
  })
    console.log(student)
    if (!course || !student) {
      throw new Error('Course or student not found  ');
    }
   console.log(! student.courses) 
   console.log(  student.courses[0]) 
if(! student.courses){
  student.courses=[course];

}
else{
  student.courses.push(course)
}

    
   
    console.log(student)
    return await this.studentRepository.save(student);
    // await this.courseRepository.save(student);
  }



  async removeStudentFromCourse(courseId: number, studentId: number): Promise<void> {
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
    throw new Error('Course or student not found  ');
  }
  console.log(student)
  console.log("ldsjbgbsjnj")
  console.log(student.courses[0])
  console.log(courseId)
  student.courses=student.courses.filter(c=> c==course)
  console.log(student.courses.filter(c=> c==course))
    console.log(student.courses)

    

  
  await this.studentRepository.save(student);

  }




  async addInstructorToCourse(courseId: number, instructorId: number): Promise<Instructor> {
    const instructor = await this.instructorrepostory.findOne({
      relations: {
          courses: true,
      },
      where:{
        id:instructorId,
      }
  })
    const course = await this.courseRepository.createQueryBuilder('course')
    .where('course.id = :courseId', { courseId })
    .getOne();
    console.log(course)
   
    if (!course || !instructor) {
      throw new Error('Course or student not found  ');
    }
    if(!instructor.courses){
      instructor.courses=[course];
    }
    else{
      instructor.courses.push(course);

    }

    
    
   
    console.log(instructor)
    return await this.instructorrepostory.save(instructor);
   

    
  }



  async getInstructorsForCourse(courseId: number): Promise<{ id: number, name: string }[]> {
    const instructor =await this.instructorrepostory.createQueryBuilder('i')
        .innerJoin('i.courses', 'c')
        .where('c.id = :courseId', { courseId })
        .getMany();
  console.log(instructor)



      // .createQueryBuilder('course')
      // .leftJoin('course.instructors', 'instructor')
      // .select(['instructor.id', 'instructor.name'])
      // .where('course.id = :id', { id: courseId })
      // .getMany();


    // if (!instructors) {
    //   throw new Error('Instructors not found for the course');
    // }

    return instructor;
  }

  async changeCourseInstructor(courseId: number, newInstructorId: number): Promise<Instructor> {
    const course = await this.courseRepository.findOne({where:{id:courseId}});
    console.log(course)
    const instruc = await this.instructorrepostory.findOne({where:{id:newInstructorId}
      ,relations: {
      courses: true,
  }});
    console.log(instruc)
    const instr:{id:number,name:string}[]= await this.getInstructorsForCourse(courseId)
    if (!course) {
      throw new Error('Course not found ');
    }
    if (!instruc) {
      throw new Error(' new Instructor not found');
    }
    for(let i=0;i<instr.length;i++){
      const ins = await this.instructorrepostory.findOne({where:{id:instr[0].id},relations: {
        courses: true,
    }});
      ins.courses=[];
      await this.instructorrepostory.save(ins);
    }
    if(!instruc.courses){
      instruc.courses=[]
    }
    else{
      instruc.courses.push(course)
    }
    console.log(instruc)
    return await this.instructorrepostory.save(instruc);
  }


  async removeinstructor(courseId: number, instructorId: number){
    const course=await this.courseRepository.findOne({where:{id:courseId}})
    const instructor = await this.instructorrepostory.findOne({
      relations: {
          courses: true,
      },
      where:{
        id:instructorId,
      }
  })
  if(instructor==null || course==null){
    console.log("no such instructor or no course")

  }
  else{
    console.log(instructor)
    
    instructor.courses=instructor.courses.filter(c=>c.id!==course.id);
    console.log(instructor)
    await this.instructorrepostory.save(instructor)
 
  }
  }
  


  async deleteCourse(courseId: number): Promise<void> {
    const course = await this.courseRepository.findOne({where:{id:courseId}});
    if (!course) {
      throw new Error('Course not found');
    }
    console.log(course)
    // let inst: {id:number,name:string}[]=await this.getInstructorsForCourse(courseId)
    // let stu:Student[]=await this.getlistofstudent(courseId)
    
    // const ins = await this.courseRepository.findOne({where:{id:courseId}});   // this.removeinstructor(courseId,1)
    // this.removeStudentFromCourse(courseId,1)

    // Save the updated course entity to remove associations
    await this.courseRepository.save(course);

    // // Delete the course entity
    await this.courseRepository.delete(courseId);
  }

  // async get(){
  //   await this.courseRepository.delete(2)
  //   const x= await this.courseRepository.find()
  //   return x
    
    
  // }



}
