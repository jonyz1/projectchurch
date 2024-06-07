import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { StudentService } from './student.service';
import { register } from 'module';
import { identity } from 'rxjs';
import { createstudentdto } from './dto/create-student-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploaddto } from './dto/file.upload.dto';
import { MultipleFileUploaddto } from './dto/MultipleFile.Upload.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';

@Controller('student')
export class StudentController {
    constructor(private studentservices:StudentService){}
    // /student 
    ///get grade
    @Get("grade/:id")
    getgrade(@Param("id") id:number){

    }
// /get list of all student 
    // @UseGuards(AuthGuard)
    @Get()
    getall(){
        return this.studentservices.get()
    }
    // /get student with id 
    @Get(":id")
    async getbyid(@Param("id") id:number){
        return await this.studentservices.getstudentid(id)
        

    }
    // /add new student 

    @Post()
    @Roles(Role.User)
    async addstudent(@Body() add:createstudentdto){
        return await this.studentservices.createstudent(add);

    }
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({description:'list of student data',type:FileUploaddto})
    @Post()
    async addbulkstudent(@UploadedFile() file){
        

    }
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({description:'list of student data',type:MultipleFileUploaddto})
    @Post()
    async addmultiplefiles(@UploadedFile() file){
        

    }
    // /getcourse
    @Get("course/:id")
    async getcourse(@Param("id") id:number){
        return await this.studentservices.getlistofcourse(id)


    }
    // /attend course
    @Post("attend")
    async assigncoursetostudent(@Body() bo:{ courseid: number, studentid: number }){
        return await this.studentservices.addcoursetostudent(bo.courseid,bo.studentid)
    }

    // /delete stuendt
   @Delete("remove/:id")
   async deletestudent(@Param("id") id:number){
        return await this.studentservices.deletestudent(id)



   }
//    remove course from the student
   @Post("resign")
   async resign(@Body() bo:{ courseid: number, studentid: number }){
    return await this.studentservices.resgin(bo.courseid,bo.studentid) 

   }
    
}

// /signin
// /singout
// /register
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
// /student 
// /get list of all student 
// /set attendance
// /set grade 
// /add new student 
// /get student with id 
// /update student 
// /remove student 
// /get list of course attending 
// /withdraw from course 
// /redirect to course page
// /instructor 
// /get all instructor 
// /add new instructor 
// /get instrucure with id 
// /get course list 
// /update instructure 
// /remove instructure 
// /drop course 
// /redirect to cours page 

