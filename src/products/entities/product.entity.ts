import { type } from 'os';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;
 
  @Column({type:"varchar",nullable:true, length:25})
  description:string
  
  @Column({type:"int" })
  existence:number

  @Column({type:"varchar", array:true})
  sizes: string[]

  @Column({
    type:"text", array:true
  })
  gender: string[]

  @Column({
    type: "float"
  })
  price: number

}