import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { createcoursedto } from 'src/courses/dto/create-course-dto';

@Controller('courses')
export class CoursesController {
    constructor(private courseservice:CoursesService){}
    // /courses
    // /get all courses
    // @Get("get")
    // get(){
    //     return this.courseservice.get()
    // }

    @Post("add")
    add(@Body() bo:createcoursedto){
        return this.courseservice.addcourse(bo)

    }
    @Get()
    getallcourse(){
        return this.courseservice.getallcourse()
    }
    
// /get course by id 
    @Get(":id")
    getallcoursebyid(@Param("id") id:number){
        // return "hrlkln"
        return this.courseservice.getbyid(id)

    }
// /transfer course student to this course 
@Get("course/transfer")
transferallstudent(){
    

}
@Post("addstudent")
    addstudenttocourse(@Body() bo:{courseId: number, studentId: number}){
        return this.courseservice.addStudentToCourse(bo.courseId,bo.studentId)

    }
// /get list of student attending the courseid
@Get("attend/:id")
    getstudentattendingcourse(@Param("id") id:number){
return this.courseservice.getlistofstudent(id)
    }
// /add student to course 

// /remove student from ciurse 
@Post("remove")
    removestudentfromcourse(@Body() bo:{courseId: number, studentId: number}){
        return this.courseservice.removeStudentFromCourse(bo.courseId,bo.studentId)


    }
// / add instructor 
@Post("assgin")
    assigninstructortocourse(@Body() bo:{courseId: number, instructorId: number}){
        return this.courseservice.addInstructorToCourse(bo.courseId,bo.instructorId)

    }
    @Post("delete")
    removeinstructo(@Body() bo:{courseId: number, instructorId: number}){
this.courseservice.removeinstructor(bo.courseId,bo.instructorId)

    }
   
// /get instructor of this course
@Get("course/:id")
    getinstructore(@Param("id") id:number){
        return this.courseservice.getInstructorsForCourse(id)

    }
// /chnage instrucutre of course
@Post("course/:id")
    ChangeStream(@Body() bo:{courseId: number, newInstructorId: number}){
return this.courseservice.changeCourseInstructor(bo.courseId,bo.newInstructorId)
    }

// /remove course 
@Delete("remove/:id")
remove(@Param("id") id:number){
    return this.courseservice.deleteCourse(id)

}

}
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