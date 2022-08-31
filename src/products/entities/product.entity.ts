import { type } from 'os';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;
 
  @Column({
    type:"varchar", length:150
  })
  Add: string
  
  @Column({type:"varchar",nullable:true, length:25})
  description:string
  
  @Column({type:"int" })
  existence:number

  @Column({type:"varchar",nullable:false, length:4})
  sizes: string

  @Column({
    type:"varchar", length:12
  })
  gender: string

  @Column({
    type: "int"
  })
  price: number

}