import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './role.shema';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    roles: Role[] 
}

export const AccountSchema = SchemaFactory.createForClass(Account);