import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './schemas/task.schema';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}
/*

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) return this.taskService.getTasksWithFilters(filterDto);
        else return this.taskService.getAllTasks(); 
    }
*/
    @Get('/:id')
    getTaskById(@Param('id') id:string): Promise<Task> {
        return this.taskService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskService.createTask(createTaskDto);
    }
/*
    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: updateTaskStatusDto): Task{
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id :string): void{
        this.taskService.deleteTask(id);
    }
        */
}
