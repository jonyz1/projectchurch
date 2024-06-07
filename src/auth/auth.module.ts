import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from 'src/entity/loginin.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Instructor } from 'src/entity/instructor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Login,Instructor]),
JwtModule.register({
  global:true,
  secret:jwtConstants.secret,
  signOptions:{expiresIn:'3600s'}
})
],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
