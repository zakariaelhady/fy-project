import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Account } from './account.shema';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;
    
    @Prop()
    projects: string[];

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: Account.name } })
    account: Account;
}

export const UserSchema = SchemaFactory.createForClass(User);