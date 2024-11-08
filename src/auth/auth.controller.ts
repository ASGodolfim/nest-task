import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private userService: AuthService) {}
/*
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getTasks(filterDto); 
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Promise<Task> {
        return this.taskService.getTaskById(id)
    }
*/
    @Post()
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User>{
        return this.userService.signUp(authCredentialsDto);
    }
    
    @Post()
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string>{
        return this.userService.signIn(authCredentialsDto);
    }
/*
    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: updateTaskStatusDto): Promise<Task>{
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id :string): Promise<void>{
        this.taskService.deleteTask(id);
    }*/
}
