import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SortOrder } from 'mongoose';
import { RoleGuard, Roles, Unprotected } from 'nest-keycloak-connect';
import { Subject } from 'rxjs';
import { ProjectCreateDto } from '../dto/project-create.dto';
import { ProjectUpdateDto } from '../dto/project-update.dto';
import { RequestOptionsDto } from '../dto/request-options.dto';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { AccountService } from '../services/account.service';
import { KeycloakUserService } from '../services/keycloak-user.service';
import { UserService } from '../services/user.service';
import { User } from '../shemas/user.shema';

@Controller('users')
export class UserController implements OnModuleInit{
    constructor(private readonly userService: UserService,
        private keycloackUserService: KeycloakUserService,
        private accountService: AccountService,
        @Inject('PROJECT_SERVICE') private projectClient: ClientKafka){}

    @Get(':userId')
    async getUserById(@Param('userId') userId: string): Promise<User>{
        return await this.userService.getUserById(userId);
    }

    @Get()
    async getUsers(@Query('limit') limit: number,
                    @Query('page') page: number,
                    @Query('sortedBy') sortedBy: string,
                    @Query('sortOrder') sortedOrder: SortOrder,
                    @Query('search') search:string): Promise<User[]>{
        const skipedItems=limit * (page - 1);
        let requestOptionsDto = new RequestOptionsDto(limit,skipedItems,[sortedBy,sortedOrder])
        return await this.userService.getUsers(requestOptionsDto,search);
    }

    @Get('items/count')
    async getUsersCount(@Query('search') search:string): Promise<number>{
        return await this.userService.getUsersCount(search);
    }

    @Post()
    async createUser(@Request() req){
        const user=req.body;
        this.keycloackUserService.createUser(req.headers.authorization,user).subscribe(async res=>{
            const account=user.account;
            const newAccount=this.accountService.createAccount(account);
            const newUser=this.userService.createUser(user);
            this.userService.setAccount(await newUser,await newAccount);
        }); 
    }

    @Patch(':userId')
    async updateUser(@Request() req){
        const user=this.userService.getUserById(req.params.userId);
        const userUpdate=req.body;
        this.keycloackUserService.getUser(req.headers.authorization,(await user).email).subscribe((id)=>{
            this.keycloackUserService.updateUser(req.headers.authorization,id,userUpdate).subscribe(async ()=>{
                await this.userService.updateUser(req.params.userId,userUpdate);
            });
        }); 
    }

    @Delete(':userId')
    async deleteUser(@Request() req){
        const userId=req.params.userId;
        const user=this.userService.getUserById(userId);
        this.keycloackUserService.getUser(req.headers.authorization,(await user).email).subscribe((id)=>{
            this.keycloackUserService.deleteUser(req.headers.authorization,id).subscribe(async ()=>{
                await this.userService.deleteUser(userId);
            });
        }); 
    }

    @Post(':userId/roles')
    async assignRole(@Request() req){
        const role=req.body;
        const userId=req.params.userId;
        const user=this.userService.getUserById(userId);
        this.keycloackUserService.getUser(req.headers.authorization,(await user).email).subscribe((id)=>{
            this.keycloackUserService.assignRoleToUser(req.headers.authorization,id,role).subscribe(async ()=>{});
        }); 
    }
    @Delete(':userId/roles')
    async unassignRole(@Request() req){
        const role=req.body;
        const userId=req.params.userId;
        const user=this.userService.getUserById(userId);
        this.keycloackUserService.getUser(req.headers.authorization,(await user).email).subscribe((id)=>{
            this.keycloackUserService.unassignRoleToUser(req.headers.authorization,id,role).subscribe(async ()=>{});
        }); 
    }

    @Get(':userId/projects/count')
    async getProjectsCount(@Param('userId') userId: string): Promise<number>{
        return (await this.userService.getUserById(userId)).projects.length;
    }

    @Get(':userId/projects')
    async getUserProjects(@Param('userId') userId: string){
        const projectsList=(await this.userService.getUserById(userId)).projects
        return this.userService.getUserProjects(projectsList);
    }

    @Post(':userId/projects')
    async addProject(@Param('userId') userId: string,@Body() projectCreateDto: ProjectCreateDto){
        return this.userService.addProject(userId,projectCreateDto)
    }

    @Patch('projects/:projectId')
    async updateProject(@Param() projectId: string,@Body() projectUpdateDto: ProjectUpdateDto){
        return this.userService.updateProject(projectId,projectUpdateDto);
    }

    @Delete(':userId/projects/:projectId')
    async removeProject(@Param('userId') userId: string,@Param('projectId') projectId: string){
        return this.userService.removeProject(userId,projectId);
    }

    async onModuleInit() {
        this.projectClient.subscribeToResponseOf('projects.get');
        this.projectClient.subscribeToResponseOf('projects.add');
        this.projectClient.subscribeToResponseOf('projects.delete');
        this.projectClient.subscribeToResponseOf('projects.update');
    }
}
