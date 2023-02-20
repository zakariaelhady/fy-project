import { IsString, IsOptional } from "class-validator";
export class RoleDto{
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsOptional()
    name: string;
}