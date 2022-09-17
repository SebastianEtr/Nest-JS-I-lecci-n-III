import { IsArray, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { number } from "joi";

export class CreateProductDto {


@ApiProperty()
@IsString()
@MinLength(5)
title:string;

@ApiProperty()
@IsString()
@IsOptional()
description:string;

@ApiProperty()
@IsNumber()
@IsPositive()
@IsOptional()
existence:number


@ApiProperty({
    description: "elige la talla: S,M,L,XL",
    maximum:1 })
@IsString({})
@IsArray()
sizes:string[]

@ApiProperty({
    description: "cual es tu genero: femenino, masculino",
    maximum:1
})
@IsString({})
@IsArray()
gender:string []


@ApiProperty({
    type: number
})
@IsNumber()
@IsPositive()
@IsOptional()
price:number
    
}
