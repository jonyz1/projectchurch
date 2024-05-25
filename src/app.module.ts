import { Module } from '@nestjs/common';

import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';

import { Instructor } from './entity/instructor.entity';
import { Course } from './entity/course.entity';
import { GradeAttendance } from './entity/grade.entity';
import { CoursesModule } from './courses/courses.module';
import { grade } from './dto/grade-dto';
import { InstructorController } from './instructor/instructor.controller';
import { InstructorService } from './instructor/instructor.service';
import { InstructorModule } from './instructor/instructor.module';
import { GradeattendController } from './gradeattend/gradeattend.controller';
import { GradeattendService } from './gradeattend/gradeattend.service';
import { GradeattendModule } from './gradeattend/gradeattend.module';

@Module({
  imports: [StudentModule,
    CoursesModule,
    InstructorModule,
    GradeattendModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'yohannes',
    database: 'newdb',
    entities: [Student,Instructor,GradeAttendance,Course],
    synchronize: true,
  }),
    
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
