import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { TypeORMError } from 'typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Instructor } from 'src/entity/instructor.entity';
import { Student } from 'src/entity/student.entity';
import { grade } from 'src/dto/grade-dto';
import { GradeAttendance } from 'src/entity/grade.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course,Instructor,Student,GradeAttendance])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {
    
}
