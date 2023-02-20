import { IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
export class UserUpdateDto{
    @IsString()
    @MinLength(4)
    @IsOptional()
    name: string;

    @IsString()
    @IsPhoneNumber('MA')
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    address: string;
}