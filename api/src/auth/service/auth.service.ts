import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as queryString from 'querystring';
import { catchError, map } from 'rxjs/operators';
import { AuthUserDto } from '../dto/auth-user.dto';
import { KeycloakTokenDto } from '../dto/keycloack-token.dto';

@Injectable()
export class AuthService {
    private keycloakRedirectUri: string;
    private keycloakClientId: string;
    private keycloakClientSecret: string;
    private keycloakTokenUri: string;
    private keycloakLogoutUri: string;
    
    constructor(  readonly config: ConfigService, private readonly http: HttpService) {
        this.keycloakRedirectUri = config.get('KEYCLOAK_REDIRECT_URI');
        this.keycloakClientId = config.get('KEYCLOAK_CLIENT_ID'); 
        this.keycloakClientSecret = config.get('KEYCLOAK_CLIENT_SECRET');
        this.keycloakTokenUri = this.config.get('KEYCLOAK_TOKEN_URI');
        this.keycloakLogoutUri = this.config.get('KEYCLOAK_LOGOUT_URI');
    }
    
    
    getAccessToken(user: AuthUserDto) {
        const params = {
            grant_type: 'password',
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            username:  user.username,
            password: user.password
        }

        return this.http.post (
            this.keycloakTokenUri,
            queryString.stringify(params),
            this.getContentType()
        ).pipe(
            map(res => res.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    refreshAccessToken(refresh_token: string) {
        const params = {
            grant_type: 'refresh_token',
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            refresh_token: refresh_token,
            redirect_uri: this.keycloakRedirectUri
        }

        return this.http.post (
            this.keycloakTokenUri,
            queryString.stringify(params),
            this.getContentType()
        ).pipe( 
            map(res => res.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    logout(refresh_token: string) {
        const params = {
            client_id: this.keycloakClientId,
            client_secret: this.keycloakClientSecret,
            refresh_token: refresh_token,
        }

        return this.http.post (
            this.keycloakLogoutUri,
            queryString.stringify(params),
            this.getContentType()
        ).pipe(
            map(res => res.data),
            catchError( e => { throw new HttpException( e.response.data, e.response.status) })
        );
    }

    getContentType() {
        return { headers: { 'Content-Type' : 'application/x-www-form-urlencoded'} }
    }
}
