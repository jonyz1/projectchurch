import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { signin } from 'src/dto/signin-dto';
import { Login } from 'src/entity/loginin.entity';
import { Repository } from 'typeorm';
import { Signup } from './signin.dto';
import { Instructor } from 'src/entity/instructor.entity';
import * as bcrypt from 'bcrypt';   

@Injectable()
export class AuthService {
    constructor(private jwtservice:JwtService,
        @InjectRepository(Login)
        private readonly loginRepository: Repository<Login>,
        @InjectRepository(Instructor)
        private readonly instructureRepository: Repository<Instructor>,
    ) {
        
    }
    async signinto(signin:signin): Promise<{access_token:string}>{
        let user= await this.loginRepository.findOne({where:{username:signin.username}})
        
        
        if(!user){
            throw UnauthorizedException
        }
        else{
            const isMatch = await bcrypt.compare(signin.password,user.password);
            if(!(isMatch)){
                throw UnauthorizedException
            }
            const payload = { sub: user.id, username: user.username };
            return {
                access_token: await this.jwtservice.signAsync(payload),
              };


        }



    }

    async signup(signup:Signup){
       
        let user=await this.instructureRepository.findOne({where:{id:signup.id,name:signup.name}})
        if(!(user||await this.loginRepository.findOne({where:{username:signup.username}}))){
            return "no user found"
        }
        const saltOrRounds = 10;
        const password = signup.password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        let logininfo= new Login()
        logininfo.instrucure=user
        logininfo.password=hash
        logininfo.username=signup.username
        return await  this.loginRepository.save(logininfo)




    }
}
