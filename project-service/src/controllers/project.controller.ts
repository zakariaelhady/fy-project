import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Project } from 'src/shemas/project.shema';
import { ProjectCreateDto } from '../dto/project-create.dto';
import { ProjectUpdateDto } from '../dto/project-update.dto';
import { ProjectService } from '../services/project.service';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService){}
    // @EventPattern('get_user_projects')
    @MessagePattern('projects.get')
    handleGetUserProjects(data: any) {
        return this.projectService.getProjects(data.projects)
    }

    @MessagePattern('projects.add')
    handleCreateProject(data: any) {
        return this.projectService.createProject(data);
    }

    @MessagePattern('projects.delete')
    handleDeleteProject(data: any) {
        return this.projectService.deleteProject(data.id);
    }

    @MessagePattern('projects.update')
    handleUpdateProject(data: any) {
        return this.projectService.updateProject(data.id.projectId,data.body);
    }

    // @Get(':projectId')
    // async getProjectById(@Param('projectId') projectId: string): Promise<Project>{
    //     return await this.projectService.getProjectById(projectId);
    // }

    // @Get()
    // async getProjects(): Promise<Project[]>{
    //     return await this.projectService.getProjects();
    // }

    // @Post()
    // async createProject(@Body() projectCreateDto: ProjectCreateDto): Promise<string>{
    //     return await this.projectService.createProject(projectCreateDto);
    // }

    // @Patch(':projectId')
    // async updateProject(@Param('projectId') projectId: string,@Body() projectUpdateDto: ProjectUpdateDto): Promise<Project>{
    //     return await this.projectService.updateProject(projectId,projectUpdateDto);
    // }
}


