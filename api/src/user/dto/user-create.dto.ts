import { IsString, IsPhoneNumber, IsEmail, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';
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
    @IsPhoneNumber('MA')
    phone: string;

    @IsString()
    address: string;

    account: AccountDto;
    
    projects: string[];
}