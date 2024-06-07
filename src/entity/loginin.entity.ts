import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Instructor } from "./instructor.entity";

@Entity()
export class Login{

    @PrimaryGeneratedColumn()
    id:number
    @Column()
    username:string
    @Column()
    password:string

   
    @JoinColumn()
    @OneToOne(() => Instructor, instr => instr.id,{nullable:true})
    instrucure: Instructor;


}