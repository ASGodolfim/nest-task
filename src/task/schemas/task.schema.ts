import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaskStatus } from '../task.model';
import { PrimaryGeneratedColumn } from 'typeorm';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    status: TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task);