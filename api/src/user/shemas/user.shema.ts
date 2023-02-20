import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Project } from './project.shema';
import * as mongoose from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;
    
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Project.name }] })
    projects: [Project];
}

export const UserSchema = SchemaFactory.createForClass(User);