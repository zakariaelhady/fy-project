import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches, MinLength } from 'class-validator';
import { Project } from '../shemas/project.shema';
export class UserCreateDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    // @IsString()
    // @IsNotEmpty()
    // @MinLength(8)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    // password: string;

    @IsString()
    @IsPhoneNumber('MA')
    phone: string;

    @IsString()
    address: string;

    projects: [Project];
}