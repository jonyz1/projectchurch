import { ApiProperty } from "@nestjs/swagger";

export class MultipleFileUploaddto{
    @ApiProperty({type:'array',items:{type:'string',format:'binary'}})
    files:any[]
}