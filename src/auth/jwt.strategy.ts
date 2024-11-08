import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./schemas/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userRepository: UserRepository) {
        super({
            secret: 'secret',
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