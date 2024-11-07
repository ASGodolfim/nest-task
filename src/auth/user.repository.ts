import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";



@Injectable()
export class UserRepository{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getUsers(): Promise<User[]>{
        const users = await this.userModel.find();
        return users
    }

    async findById(id: string){
        return await this.userModel.findById(id)
    }

    async create(username: string, password: string){
        return await this.userModel.create({username, password})
    }

    async delete(id: string){
        return await this.userModel.findByIdAndDelete(id);
    }

    async update(id: string){
        return await this.userModel.findByIdAndUpdate(id);
    }
}