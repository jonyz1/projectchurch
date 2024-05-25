import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GradeattendService } from './gradeattend.service';

@Controller('gradeattend')
export class GradeattendController {
    constructor(private gradeservice:GradeattendService){}
    // getgrade
    // get grade of student
    @Get("grade/course/:courseid/student/:studentid")
    async getgrade(@Param("courseid") courseid:number,@Param("studentid") studenetid:number){
        return await this.gradeservice.getgrade(courseid,studenetid)




    }
    // add the grade of the student
    @Post("addgrade")
    async addgrade(@Body() bo:{courseId:number,studentId:number,grade:string}){
        return await this.gradeservice.create(bo.courseId,bo.studentId,bo.grade)


    }
    // remove the grade because of mistake
    @Post("removegrade")
    async remove(@Body() bo:{id:number} ){
        return await this.gradeservice.remove(bo.id)

    }
    // get attendnce
    @Get("attend/course/:courseid/student/:studentid")
    async getattend(@Param("courseid") courseid:number,@Param("studentid") studenetid:number){
        const att=await this.gradeservice.getattend(courseid,studenetid)
       return att ?att:0;


    }
    @Post("addattend")
    async addattend(@Body() bo:{courseId:number,studentId:number}){
        return await this.gradeservice.addattend(bo.courseId,bo.studentId)

    }
    @Post("addattend/minus")
    async deducte(@Body() bo:{courseId:number,studentId:number}){
       return await  this.gradeservice.minuse(bo.courseId,bo.studentId)

    }
    @Post("removeattend")
    async removeattend(@Body() bo:{courseId:number,studentId:number} ){
        return await this.gradeservice.removeattend(bo.courseId,bo.studentId)

    }

}
