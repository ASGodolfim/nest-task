import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './schemas/task.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/schemas/user.schema';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getTasks(filterDto); 
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Promise<Task> {
        return this.taskService.getTaskById(id)
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User            
    ): Promise<Task>{
        return this.taskService.createTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: updateTaskStatusDto): Promise<Task>{
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id :string): Promise<void>{
        this.taskService.deleteTask(id);
    }
    
}
