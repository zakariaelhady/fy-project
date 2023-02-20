import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder, SortValues } from 'mongoose';
import { RequestOptionsDto } from '../dto/request-options.dto';
import { Project } from '../shemas/project.shema';
import { User, UserDocument } from '../shemas/user.shema';

@Injectable()
export class UserDao {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User>{
        return this.userModel.findOne(userFilterQuery);
    }
    
    async find(userFilterQuery: FilterQuery<User>,requestOptionsDto: RequestOptionsDto): Promise<User[]>{
        return this.userModel.find(userFilterQuery).sort([requestOptionsDto.sort]).skip(requestOptionsDto.skip)
        .limit(requestOptionsDto.limit).populate('projects');
    }

    async count(userFilterQuery: FilterQuery<User>): Promise<number>{
        return this.userModel.find(userFilterQuery).count();
    }

    async create(user: User): Promise<User>{
        const newUser = new this.userModel(user);
        await newUser.populate('projects');
        return newUser.save();
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>,user: Partial<User>): Promise<User>{
        return this.userModel.findOneAndUpdate(userFilterQuery,user,{new:true});
    }

    async findOneAndDelete(userFilterQuery: FilterQuery<User>): Promise<User>{
        return this.userModel.findOneAndDelete(userFilterQuery);
    }


    async addProject(userFilterQuery: FilterQuery<User>, projectId: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(
            userFilterQuery,
            { $addToSet: { projects: projectId } },
            { new: true },
        );
    }

    async removeProject(userFilterQuery: FilterQuery<User>, projectId: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(
        userFilterQuery,
        { $pull: { projects: projectId } },
        { new: true },
        );
    }

    async findOnePopulate(userFilterQuery: FilterQuery<User>): Promise<User>{
        return this.userModel.findOne(userFilterQuery).populate('projects');
    }
}
