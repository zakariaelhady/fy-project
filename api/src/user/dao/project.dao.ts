import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder, SortValues } from 'mongoose';
import { Project, ProjectDocument } from '../shemas/project.shema';
import { User } from '../shemas/user.shema';
import { UserDao } from './user.dao';

@Injectable()
export class ProjectDao {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>,private readonly userDao: UserDao) {}

    async create(project: Project): Promise<Project>{
        const newProject = new this.projectModel(project).save();
        return newProject;
    }

    async findOne(projectFilterQuery: FilterQuery<Project>): Promise<Project>{
        return this.projectModel.findOne(projectFilterQuery);
    }

    async find(projectFilterQuery: FilterQuery<Project>): Promise<Project[]>{
        return this.projectModel.find(projectFilterQuery);
    }
    async count(userFilterQuery: FilterQuery<User>): Promise<number>{
        return await (await this.userDao.findOnePopulate(userFilterQuery)).projects.length;
    }

    async delete(projectId:string,userId: string): Promise<Project>{
        await this.userDao.removeProject({_id: userId}, projectId);
        return this.projectModel.findOneAndDelete({_id: projectId}); 
    }
    async findOneAndUpdate(projectFilterQuery: FilterQuery<Project>,project: Partial<Project>): Promise<Project>{
        return this.projectModel.findOneAndUpdate(projectFilterQuery,project,{new:true});
    }


    //////

    async createP(project: Project): Promise<string>{
        const newProject = new this.projectModel(project).save();
        return (await newProject).id;
    }

    async findOneAndDelete(projectFilterQuery: FilterQuery<Project>): Promise<string>{
        return (await this.projectModel.findOneAndDelete(projectFilterQuery)).id;
    }
}
