import {  IsNumber, IsOptional, IsString } from 'class-validator';
export class KeycloakTokenDto{
    @IsString()
    @IsOptional()
    access_token: string;

    @IsString()
    @IsOptional()
    refresh_token: string;

    @IsNumber()
    @IsOptional()
    expires_in: number;

    @IsNumber()
    @IsOptional()
    refresh_expires_in: string;
}