import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { UserRepository } from "./user.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./schemas/user.schema";
require ('dotenv').config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userRepository: UserRepository) {
        super({
            secret: process.env.JWT_SECRET_KEY || 'secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),            
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        const { username } = payload;
        const user: User = await this.userRepository.findOne(username);

        if (!user) throw new UnauthorizedException();
        return user;
    }
}