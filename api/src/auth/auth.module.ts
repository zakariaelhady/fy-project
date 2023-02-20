import { Module } from '@nestjs/common';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

const keyCloakOptionsProvider =  {
  provide: 'keyCloakDataProvider',
  useFactory: async (config: ConfigService) => {
    return {
      authServerUrl: config.get('KEYCLOAK_AUTH_URI'),
      realm: config.get('KEYCLOAK_REALM'),
      clientId: config.get('KEYCLOAK_CLIENT_ID'),
      secret: config.get('KEYCLOAK_CLIENT_SECRET')
    }
  },
  inject: [ ConfigService],
};
@Module({
  imports: [HttpModule,
    KeycloakConnectModule.registerAsync(keyCloakOptionsProvider),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AuthModule {}