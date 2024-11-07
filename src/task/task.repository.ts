import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { Model } from "mongoose";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";


@Injectable()
export class TaskRepository{
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    async getTasks(filter: GetTasksFilterDto): Promise<Task[]>{
        const { status, search } = filter
        let tasks = await this.taskModel.find()
        if (status) {tasks.filter(el => el.status === status)}
        return tasks;
    }

    async findById(id: string){
        return await this.taskModel.findById(id)
    }

    async create(title: string, description: string){
        return await this.taskModel.create({title, description})
    }

    async delete(id: string){
        return await this.taskModel.findByIdAndDelete(id);
    }

    async update(id: string){
        return await this.taskModel.findByIdAndUpdate(id);
    }


}