import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class createinstructuredto{
    @ApiProperty({description:"the name of instructure",default:"sir",minLength:20})
    name:string;
    @ApiProperty({enum:['Admin','Moderator','User']})
    role:UserRole
    @ApiPropertyOptional()
    fname:string
    @ApiProperty({required:false,type:Number})
    age:number
    @ApiProperty({isArray:true})
    class:string[]

    
}


export enum UserRole {
    Admin = 'Admin',
    Moderator = 'Moderator',
    User = 'User',
  }
  
export interface check{
    fn:string
}