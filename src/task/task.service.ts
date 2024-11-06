import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './schemas/task.schema';

@Injectable()
export class TaskService {
    
    constructor(private readonly taskRepository: TaskRepository) {}

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        

        
        return
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findById(id)
        if(!found) {
            throw new NotFoundException(`Task with id ${id} Not Found`);
        } else return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto;
        
        const task = await this.taskRepository.create(title, description);

        await task.save();

        return task;
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
        const task = await this.taskRepository.update(id);
        
        if(!task) {
            throw new NotFoundException(`Task with id ${id} Not Found`);
        }

        task.status = status;
        
        task.save()

        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const found = await this.taskRepository.delete(id);
        console.log(found)
    }
}
