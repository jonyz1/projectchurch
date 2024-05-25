import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeattendController } from './gradeattend.controller';
import { GradeattendService } from './gradeattend.service';
import { Student } from 'src/entity/student.entity';
import { count } from 'console';
import { Course } from 'src/entity/course.entity';
import { Instructor } from 'src/entity/instructor.entity';
import { GradeAttendance } from 'src/entity/grade.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Student,Course,Instructor,GradeAttendance])],
  controllers: [GradeattendController],
  providers: [GradeattendService],
})
export class GradeattendModule {}
