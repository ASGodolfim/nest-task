import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Matches } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    username: string;

    @Prop({
        required: true,
        minlength: 8,
        match: [/((?=.*\d)|(?=.%\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password Too weak']
        })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User); 