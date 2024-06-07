import { Body, Controller, Post } from '@nestjs/common';
import { Signin, Signup } from './signin.dto';
import { AuthService } from './auth.service';
import { Public } from './public';

@Controller('auth')
export class AuthController {
    constructor(private service:AuthService) {
        
    }
    @Public()
    @Post("singin")
    async signin(@Body() signin:Signin){
        return await this.service.signinto(signin)


    }

    @Public()
    @Post("singup")
    async sinup(@Body() signup:Signup){
        return await this.service.signup(signup)


    }

}
