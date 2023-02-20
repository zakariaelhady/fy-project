import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDao } from '../dao/user.dao';
import { ProjectCreateDto } from '../dto/project-create.dto';
import { RequestOptionsDto } from '../dto/request-options.dto';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { Project } from '../shemas/project.shema';
import { User, UserDocument } from '../shemas/user.shema';

@Injectable()
export class UserService {
    constructor(private readonly userDao: UserDao) {}

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
    async getUserProjects(userId: string): Promise<User>{
        return await this.userDao.findOnePopulate({_id: userId});
    }

    async addProject(userId: string,projectId:string): Promise<User>{
        return await this.userDao.addProject({_id: userId},projectId);
    }

    async removeProject(userId: string,projectId:string): Promise<User>{
        return await this.userDao.removeProject({_id: userId},projectId);
    }
}
