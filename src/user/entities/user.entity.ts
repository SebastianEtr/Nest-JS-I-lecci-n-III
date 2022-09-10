import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    email: string;
    
    @Column('text')
    name: string

    @Column("text")
    lastname: string

    @Column('text', { select:false })
    password: string

    @Column('bool', { default:true })
    active: boolean
    
    @Column('text', { array:true, default: ["user"]})
    roles: string[]

}
