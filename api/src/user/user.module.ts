import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User,UserSchema } from './shemas/user.shema';
import { UserDao } from './dao/user.dao';
import { Project, ProjectSchema } from './shemas/project.shema';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { ProjectDao } from './dao/project.dao';
import { KeycloakUserService } from './services/keycloak-user.service';
import { HttpModule } from '@nestjs/axios';
import { AccountService } from './services/account.service';
import { AccountDao } from './dao/account.dao';
import { Account, AccountSchema } from './shemas/account.shema';
import { Role, RoleSchema } from './shemas/role.shema';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Project.name, schema: ProjectSchema },
            { name: Account.name, schema: AccountSchema },
            { name: Role.name, schema: RoleSchema }
        ]),
        HttpModule
    ],
    controllers: [UserController,ProjectController],
    providers: [UserService,UserDao,ProjectService,ProjectDao,KeycloakUserService,AccountService,AccountDao],
})
export class UserModule {}
