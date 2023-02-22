import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom, Observable, Subject, tap } from 'rxjs';
import { UserDao } from '../dao/user.dao';
import { ProjectCreateDto } from '../dto/project-create.dto';
import { ProjectUpdateDto } from '../dto/project-update.dto';
import { RequestOptionsDto } from '../dto/request-options.dto';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { GetUserProjectsEvent } from '../events/get-user-projects.event';
import { ProjectCreatedEvent } from '../events/project-created.event';
import { ProjectDeletedEvent } from '../events/project-deleted.event';
import { ProjectUpdatedEvent } from '../events/project-updated.event';
import { User } from '../shemas/user.shema';

@Injectable()
export class UserService {
    constructor(private readonly userDao: UserDao,
        @Inject('PROJECT_SERVICE') private readonly projectClient: ClientKafka) {}

    async getUserById(userId: string): Promise<User>{
        return await this.userDao.findOne({_id: userId});
    }

    async getUsers(requestOptionsDto:RequestOptionsDto,search: string): Promise<User[]>{
        return await this.userDao.find(this.userFilter(search),requestOptionsDto);
    }

    async getUsersCount(search: string): Promise<number>{
        return await this.userDao.count(this.userFilter(search));
    }

    async createUser(userCreateDto: UserCreateDto): Promise<User>{
        return await this.userDao.create(userCreateDto);
    }   

    async updateUser(userId: string,userUpdateDto: UserUpdateDto): Promise<User>{
        return await this.userDao.findOneAndUpdate({_id: userId},userUpdateDto);
    }

    async deleteUser(userId: string): Promise<User>{
        return await this.userDao.findOneAndDelete({_id: userId});
    }

    userFilter(search: string){
        const searchRegx={ "$regex": search, "$options": "i" }
        let userFiler={
            $or: [
                { name: searchRegx},
                { phone: searchRegx},
                { address: searchRegx}
            ]
        }
        return userFiler
    }

    //
    getUserProjects(projectsIdList: string[]){
        return this.projectClient.send(
            'projects.get',
            new GetUserProjectsEvent(projectsIdList),
        )
    }

    async addProject(userId: string,{name,description}: ProjectCreateDto){
        const result = new Subject<Promise<User>>();
        this.projectClient.send(
            'projects.add',
            new ProjectCreatedEvent(name,description),
        ).subscribe((id)=>{
            const user=this.userDao.addProject({_id: userId},id)
            result.next(user);
            result.complete();
        });
        return result;
    }

    async removeProject(userId: string,projectId:string){
        const result = new Subject<Promise<User>>();
        this.projectClient.send(
            'projects.delete',
            new ProjectDeletedEvent(projectId),
        ).subscribe((id)=>{
            const user=this.userDao.removeProject({_id: userId},id);
            result.next(user);
            result.complete();
        });
        return result;
    }

    async updateProject(projectId:string,{name,description}: ProjectUpdateDto){
        return this.projectClient.send(
            'projects.update',
            new ProjectUpdatedEvent(projectId,name,description),
        )
    }

    async setAccount(user: Partial<User>,accountId: string): Promise<User>{
        return await this.userDao.setAccount(user,accountId);
    }
}
