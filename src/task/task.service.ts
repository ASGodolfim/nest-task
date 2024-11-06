import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './schemas/task.schema';

@Injectable()
export class TaskService {
    
    constructor(private readonly taskRepository: TaskRepository) {}
/*
    private tasks: Task[] = [];

    getAllTasks(){
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
        const { status, search } = filterDto
        
        let tasks = this.getAllTasks();

        if(status) {
            if (status === 'DONE' || status === 'IN_PROGRESS' || status === 'OPEN') tasks = tasks.filter((task) => task.status === status);
            else throw new BadRequestException
        }

        if(search) tasks = tasks.filter((task) => {
            if (task.title.includes(search) || task.description.includes(search)) {
                if (!tasks[0]) throw new NotFoundException;
                else return true
            } else return false
        })
        
        return tasks;
    }
*/
    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findById(id)
        if(!found) throw new NotFoundException(`Task with id ${id} Not Found`);
        else return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto;
        
        const task = await this.taskRepository.create(title, description);
        
        return task;
    }
/*
    updateTaskStatus(id: string, status: TaskStatus){
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task._id !== id);
    }
*/
}
