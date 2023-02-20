

import {  IsOptional, IsString } from 'class-validator';
export class AuthUserDto{
    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    password: string;
}