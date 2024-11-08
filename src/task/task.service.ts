import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './schemas/task.schema';
import { User } from 'src/auth/schemas/user.schema';
import { GetUser } from 'src/auth/get-user.decorator';

@Injectable()
export class TaskService {
    
    constructor(private readonly taskRepository: TaskRepository) {}

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{
        const tasks = this.taskRepository.getTasks(filterDto, user);
        return tasks
    }

    async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        const tasks = this.taskRepository.getAllTasks(filterDto);
        return tasks
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.taskRepository.findById(id)
        if(!found) {
            throw new NotFoundException(`Task with id ${id} Not Found`);
        } else if (found.users !== user) throw new NotFoundException(`Task with id ${id} Not Found`);
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        const { title, description } = createTaskDto;
        
        const task = await this.taskRepository.create(title, description, user);

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
