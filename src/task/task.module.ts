import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskRepository } from "./task.repository";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { Task, TaskSchema } from "./schemas/task.schema";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
        AuthModule
    ],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
    exports: [TaskService]
})
export class TaskModule {}