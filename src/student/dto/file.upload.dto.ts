import { ApiProperty } from "@nestjs/swagger";

export class FileUploaddto{
    @ApiProperty({type:'string',format:'binary'})
    file:any
}