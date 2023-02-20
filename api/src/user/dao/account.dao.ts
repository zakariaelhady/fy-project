import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { Account, AccountDocument } from '../shemas/account.shema';
import { UserDao } from './user.dao';

@Injectable()
export class AccountDao {
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>,private readonly userDao: UserDao) {}

    async create(account: Account): Promise<string>{
        const newAccount = new this.accountModel(account).save();
        return (await newAccount).id;
    }

    async findOne(accountFilterQuery: FilterQuery<Account>): Promise<Account>{
        return this.accountModel.findOne(accountFilterQuery);
    }

    async find(accountFilterQuery: FilterQuery<Account>): Promise<Account[]>{
        return this.accountModel.find(accountFilterQuery);
    }

    async findOneAndUpdate(accountFilterQuery: FilterQuery<Account>,account: Partial<Account>): Promise<Account>{
        return this.accountModel.findOneAndUpdate(accountFilterQuery,account,{new:true});
    }

    async findOneAndDelete(accountFilterQuery: FilterQuery<Account>): Promise<Account>{
        return this.accountModel.findOneAndDelete(accountFilterQuery);
    }
}
