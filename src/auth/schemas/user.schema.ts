import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Task } from 'src/task/schemas/task.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    username: string;

    @Prop({
        required: true,
        select: true,
        minlength: 8,
        match: [/((?=.*\d)|(?=.%\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password Too weak']
        })
    password: string;

    @Prop({
        type: mongoose.Schema.ObjectId,
        ref: 'Task'
    })
    tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User); 