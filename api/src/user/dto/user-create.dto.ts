import { IsString, IsPhoneNumber, IsEmail, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';
import { Project } from '../shemas/project.shema';
import { AccountDto } from './account.dto';
export class UserCreateDto{
    @IsString()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsOptional()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
    
    @IsString()
    @IsPhoneNumber('MA')
    phone: string;

    @IsString()
    address: string;
    
    projects: [Project];
}