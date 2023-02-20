import {  IsNotEmpty, IsString } from 'class-validator';
export class ProjectCreateDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}