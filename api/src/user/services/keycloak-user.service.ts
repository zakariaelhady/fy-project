import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as queryString from 'querystring';
import { catchError, map } from 'rxjs/operators';
import { RoleDto } from '../dto/role.dto';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';

@Injectable()
export class KeycloakUserService {
    private keycloakUsers: string;
    
    constructor(  readonly config: ConfigService, private readonly http: HttpService) {
        this.keycloakUsers = config.get('KEYCLOAK_USERS');
    }

    createUser(access_token: string,user: UserCreateDto){
        const body={
            "username": user.username,
            "enabled": true,
            "email": user.email,
            "firstName": user.firstname,
            "lastName": user.lastname,
            "credentials": [
                {
                    "type": "password",
                    "value": user.password,
                    "temporary": false
                }
            ]
        }
        return this.http.post (
            this.keycloakUsers,
            body,
            this.getAuthorization(access_token)
        ).pipe( 
            map(res => res.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    updateUser(access_token: string,userId: string,user: UserUpdateDto){
        const body={
            "firstName": user.firstname,
            "lastName": user.lastname,
            "email": user.email      
        }
        return this.http.put (
            this.keycloakUsers+userId,
            body,
            this.getAuthorization(access_token)
        ).pipe( 
            map(res => res.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }
    deleteUser(access_token: string,userId: string){
        return this.http.delete (
            this.keycloakUsers+userId,
            this.getAuthorization(access_token)
        ).pipe( 
            map(res => res.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    assignRoleToUser(access_token: string,userId: string,roleDto: RoleDto) {
        const AssignRoleToUserUri=this.keycloakUsers+userId+'/role-mappings/realm'
        return this.http.post (
            AssignRoleToUserUri,
            roleDto,
            this.getAuthorization(access_token)
        ).pipe( 
            map(res => res.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    unassignRoleToUser(access_token: string,userId: string,roleDto: RoleDto) {
        const AssignRoleToUserUri=this.keycloakUsers+userId+'/role-mappings/realm'
        return this.http.delete (
            AssignRoleToUserUri,{
                data: roleDto,
                headers: { Authorization: `Bearer ${access_token}` }
            }
        ).pipe( 
            map(res => res.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    getAuthorization(access_token: string) {
        return { headers: { Authorization: `Bearer ${access_token}` } }
    }

}
