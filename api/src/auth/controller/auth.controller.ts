import { Body, Controller, Get, HttpCode, Post, Query, Redirect } from '@nestjs/common';
import { Unprotected } from 'nest-keycloak-connect';
import { AuthService } from '../service/auth.service';
import { KeycloakTokenDto } from '../dto/keycloack-token.dto';
import { AuthUserDto } from '../dto/auth-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('token')
    @Unprotected()
    getAccessToken(@Body() user: AuthUserDto) {
        return this.authService.getAccessToken(user);
    }

    @Post('refreshToken') 
    @Unprotected()
    refreshAccessToken(@Body() token: KeycloakTokenDto) {
        return this.authService.refreshAccessToken(token.refresh_token)
    }

    @Post('logout')
    @Unprotected()
    logout(@Body() token: KeycloakTokenDto){
        return this.authService.logout(token.refresh_token);
    }
}
