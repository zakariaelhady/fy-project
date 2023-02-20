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
@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Project.name, schema: ProjectSchema }])],
    controllers: [UserController,ProjectController],
    providers: [UserService,UserDao,ProjectService,ProjectDao],
})
export class UserModule {}
