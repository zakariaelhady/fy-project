import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User,UserSchema } from './shemas/user.shema';
import { UserDao } from './dao/user.dao';
import { KeycloakUserService } from './services/keycloak-user.service';
import { HttpModule } from '@nestjs/axios';
import { AccountService } from './services/account.service';
import { AccountDao } from './dao/account.dao';
import { Account, AccountSchema } from './shemas/account.shema';
import { Role, RoleSchema } from './shemas/role.shema';
import { ConfigService } from '@nestjs/config';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ProjectCreateDto } from './dto/project-create.dto';

const kafkaProvider =  {
    name: 'PROJECT_SERVICE',
    transport: Transport.KAFKA,
    useFactory: (config: ConfigService) => {
        return {
        options: {
            client: {
                clientId: config.get('KAFKA_CLIENT_ID'),
                brokers: [config.get('KAFKA_BROKER')],
            },
                consumer: {
                groupId: config.get('KAFKA_GROUP_ID'),
            },
        }
    }},
    inject: [ ConfigService],
  }; 
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Account.name, schema: AccountSchema },
            { name: Role.name, schema: RoleSchema }
        ]),
        ClientsModule.register([{
            name: 'PROJECT_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'project',
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'project-consumer',
                },
            },
        }]),
        HttpModule
    ],
    controllers: [UserController],
    providers: [UserService,UserDao,ProjectCreateDto,KeycloakUserService,AccountService,AccountDao],
})
export class UserModule {}
