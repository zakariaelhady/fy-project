import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';

const databaseProvider =  {
  provide: 'databaseProvider',
  useFactory: async (config: ConfigService) => {
    return { uri: config.get('DATABASE_CONNECTION')}
  },
  inject: [ ConfigService],
}; 
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync(databaseProvider),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
