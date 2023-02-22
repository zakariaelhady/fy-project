import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
// const kafkaProvider =  {
//   name: 'PROJECT_SERVICE',
//   transport: Transport.KAFKA,
//   useFactory: (config: ConfigService) => {
//     return {
//     options: {
//       client: {
//         clientId: config.get('KAFKA_CLIENT_ID'),
//         brokers: [config.get('KAFKA_GROUP_ID')],
//       },
//       consumer: {
//         groupId: config.get('KAFKA_GROUP_ID'),
//       },
//     }
//   }},
//   inject: [ ConfigService],
// }; 
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({isGlobal: true}),
    // ClientsModule.registerAsync([kafkaProvider]),
    MongooseModule.forRootAsync(databaseProvider),
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
