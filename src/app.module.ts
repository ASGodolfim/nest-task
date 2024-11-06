import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskRepository } from './task/task.repository';
import { Task, TaskSchema } from './task/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', { dbName: 'task-management' }),
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema
      }
    ])
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService, TaskRepository],
})
export class AppModule {}
