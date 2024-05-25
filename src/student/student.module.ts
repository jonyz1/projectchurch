import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from '../entity/student.entity';

import { Course } from 'src/entity/course.entity';
import { Instructor } from 'src/entity/instructor.entity';
import { GradeAttendance } from 'src/entity/grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student,Course,Instructor,GradeAttendance])],
  controllers: [StudentController],
  providers: [StudentService],
  
})
export class StudentModule {}