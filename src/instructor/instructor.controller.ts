import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { UserRole, check, createinstructuredto } from './dto/create-instructure-dto';

import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { channel } from 'diagnostics_channel';
import { checkPrime } from 'crypto';
import { Check } from 'typeorm';

@Controller('instructor')
export class InstructorController {
    constructor(private instructorservice:InstructorService){}
    // /instructor 
// /get all instructor 
@Get()
getallinstructor(){
    return this.instructorservice.get()

}

// /add new instructor 
@Post()
createinstructor(@Body() add:createinstructuredto){
    return this.instructorservice.createinstructor(add)


}
// /get instrucure with id 
@Get(":id")
getinstructor(@Param("id") id:number){
    return this.instructorservice.getinstructorid(id)

}
// /get course list 
@Get("course/:id")
getcourslist(@Param("id") id:number){
    return this.instructorservice.getlistofcourse(id)

}
// assigninstructor to course
@Post("assign")
assign(@Body() bo:{courseId:number,instructorId:number}){
    return this.instructorservice.addinstructortocourse(bo.courseId,bo.instructorId)

}
//resign course form instructor
@Post("resign")
resign(@Body() bo:{courseId:number,instructorId:number}){
    return this.instructorservice.resgin(bo.courseId,bo.instructorId)
}

// /remove instructure 
@Delete(":id")
remove(@Param("id") id:number){
    return this.instructorservice.deleteinstructor(id)
}
@Get("check")
@ApiQuery({name:'role',enum:UserRole})
async filterByRole(@Query('role') role:UserRole=UserRole.User) {}




}
