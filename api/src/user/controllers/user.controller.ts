import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SortOrder } from 'mongoose';
import { RoleGuard, Roles, Unprotected } from 'nest-keycloak-connect';
import { ProjectCreateDto } from '../dto/project-create.dto';
import { RequestOptionsDto } from '../dto/request-options.dto';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { Project } from '../shemas/project.shema';
import { User } from '../shemas/user.shema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService,
        private projectService: ProjectService){}

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
    async createUser(@Body() userCreateDto: UserCreateDto): Promise<User>{
        return await this.userService.createUser(userCreateDto);
    }

    @Patch(':userId')
    async updateUser(@Param('userId') userId: string,@Body() userUpdateDto: UserUpdateDto): Promise<User>{
        return await this.userService.updateUser(userId,userUpdateDto);
    }

    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string): Promise<User>{
        return await this.userService.deleteUser(userId);
    }

    @Get(':userId/projects')
    async getUserProjects(@Param('userId') userId: string): Promise<Project[]>{
        return (await this.userService.getUserProjects(userId)).projects;
    }

    @Get(':userId/projects/count')
    async getProjectsCount(@Param('userId') userId: string): Promise<number>{
        return await this.projectService.getProjectsCount(userId);
    }

    @Post(':userId/projects')
    async addProject(@Param('userId') userId: string,@Body() projectCreateDto: ProjectCreateDto): Promise<User>{
        const newProject=this.projectService.createProject(projectCreateDto);
        return this.userService.addProject(userId,await newProject)
    }

    @Delete(':userId/projects/:projectId')
    async removeProject(@Param('userId') userId: string,@Param('projectId') projectId: string): Promise<User>{
        const newProject=this.projectService.deleteProject(projectId);
        return this.userService.removeProject(userId,await newProject)
    }
}
