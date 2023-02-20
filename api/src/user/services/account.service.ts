import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AccountDao } from '../dao/account.dao';
import { AccountDto } from '../dto/account.dto';
import { Account } from '../shemas/account.shema';

@Injectable()
export class AccountService {
    constructor(private readonly accountDao: AccountDao) {}

    async createAccount(accountCreateDto: AccountDto): Promise<string>{
        return await this.accountDao.create(accountCreateDto);
    }  
    
    async getAccounts(): Promise<Account[]>{
        return await this.accountDao.find({});
    }

    async getAccountById(accountId: string): Promise<Account>{
        return await this.accountDao.findOne({_id: accountId});
    }

    async updateAccount(accountId: string,accountUpdateDto: AccountDto): Promise<Account>{
        return await this.accountDao.findOneAndUpdate({_id: accountId},accountUpdateDto);
    }

    accountFilter(search: string){
        const searchRegx={ "$regex": search, "$options": "i" }
        let accountFiler={
            $or: [
                { name: searchRegx},
                { description: searchRegx}
            ]
        }
        return accountFiler
    }

    async deleteAccount(accountId: string): Promise<Account>{
        return await this.accountDao.findOneAndDelete({_id: accountId});
    }
}
