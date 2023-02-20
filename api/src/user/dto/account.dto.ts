import { IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { RoleDto } from './role.dto';
export class AccountDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @IsOptional()
    roles: RoleDto[] 
}