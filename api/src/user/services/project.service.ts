import { Injectable } from '@nestjs/common';
import { ProjectDao } from '../dao/project.dao';
import { ProjectCreateDto } from '../dto/project-create.dto';
import { ProjectUpdateDto } from '../dto/project-update.dto';
import { Project } from '../shemas/project.shema';

@Injectable()
export class ProjectService {
    constructor(private readonly projectDao: ProjectDao) {}

    async createProject(projectCreateDto: ProjectCreateDto): Promise<string>{
        return await this.projectDao.createP(projectCreateDto);
    }  
    
    async getProjects(): Promise<Project[]>{
        return await this.projectDao.find({});
    }

    async getProjectsCount(userId: string): Promise<number>{
        return await this.projectDao.count({_id: userId});
    }

    async getProjectById(projectId: string): Promise<Project>{
        return await this.projectDao.findOne({_id: projectId});
    }

    async updateProject(projectId: string,projectUpdateDto: ProjectUpdateDto): Promise<Project>{
        return await this.projectDao.findOneAndUpdate({_id: projectId},projectUpdateDto);
    }

    projectFilter(search: string){
        const searchRegx={ "$regex": search, "$options": "i" }
        let projectFiler={
            $or: [
                { name: searchRegx},
                { description: searchRegx}
            ]
        }
        return projectFiler
    }

    async deleteProject(projectId: string): Promise<string>{
        return await this.projectDao.findOneAndDelete({_id: projectId});
    }
}
