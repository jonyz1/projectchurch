import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entity/course.entity';
import { GradeAttendance } from 'src/entity/grade.entity';
import { Instructor } from 'src/entity/instructor.entity';
import { Student } from 'src/entity/student.entity';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';

@Module({
    imports: [TypeOrmModule.forFeature([Course,Instructor,Student,GradeAttendance])],
  controllers: [InstructorController],
  providers: [InstructorService],
})
export class InstructorModule {

}
