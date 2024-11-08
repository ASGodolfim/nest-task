import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { TaskStatus } from '../task-status.enum';
import { User } from 'src/auth/schemas/user.schema';
import { Exclude } from 'class-transformer';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({type: String, enum: TaskStatus, default: 'OPEN'})
    status: TaskStatus

    @Prop({
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    })
    @Exclude({toPlainOnly: true})
    users: User; 
}

export const TaskSchema = SchemaFactory.createForClass(Task); 