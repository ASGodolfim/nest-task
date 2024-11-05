import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}


    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks(); 
    }

    @Get()
    getTaskById(@Param('id') id): Task {
        return this.taskService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
        return this.taskService.createTask(createTaskDto);
    }
    
}
