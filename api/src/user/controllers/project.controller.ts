import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SortOrder } from 'mongoose';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ProjectCreateDto } from '../dto/project-create.dto';
import { ProjectUpdateDto } from '../dto/project-update.dto';
import { ProjectService } from '../services/project.service';
import { Project } from '../shemas/project.shema';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService){}

    @Get(':projectId')
    async getProjectById(@Param('projectId') projectId: string): Promise<Project>{
        return await this.projectService.getProjectById(projectId);
    }

    @Get()
    async getProjects(): Promise<Project[]>{
        return await this.projectService.getProjects();
    }

    @Post()
    async createProject(@Body() projectCreateDto: ProjectCreateDto): Promise<string>{
        return await this.projectService.createProject(projectCreateDto);
    }

    @Patch(':projectId')
    async updateProject(@Param('projectId') projectId: string,@Body() projectUpdateDto: ProjectUpdateDto): Promise<Project>{
        return await this.projectService.updateProject(projectId,projectUpdateDto);
    }
}


