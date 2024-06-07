import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Student } from '../entity/student.entity';

import { Course } from 'src/entity/course.entity';
import { Instructor } from 'src/entity/instructor.entity';
import { GradeAttendance } from 'src/entity/grade.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Student,Course,Instructor,GradeAttendance])],
  controllers: [StudentController],
  providers: [StudentService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
  
})
export class StudentModule {}