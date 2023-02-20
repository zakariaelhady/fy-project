import { IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
export class UserUpdateDto{
    @IsString()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsOptional()
    lastname: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    email: string;

    @IsString()
    @IsPhoneNumber('MA')
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    address: string;
}