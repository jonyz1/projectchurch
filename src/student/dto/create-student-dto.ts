import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class createstudentdto{
    @ApiProperty()
    name:string;
    @ApiProperty()
    dateofbirth:string;
    @ApiProperty()
    gender:string
    @ApiPropertyOptional()
  age?: number;
  
// @ApiProperty({ type: () => "" })
// node: string;

  
}
