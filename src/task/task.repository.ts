import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { Model } from "mongoose";


@Injectable()
export class TaskRepository{
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
    
    findById(id: string){
        return this.taskModel.findById(id)
    }

    create(title: string, description: string){
        return this.taskModel.create({title, description})
    }

    delete(id: string){
        return this.taskModel.findByIdAndDelete(id);
    }
}