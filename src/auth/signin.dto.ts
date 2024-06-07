import { ApiProperty } from "@nestjs/swagger";

export class Signin{
    @ApiProperty()
    username:string;
    @ApiProperty()
    password:string;
}

export class Signup{
    @ApiProperty()
    username:string;
    @ApiProperty()
    password:string;
    @ApiProperty()
    name:string;
    @ApiProperty()
    id:number

}