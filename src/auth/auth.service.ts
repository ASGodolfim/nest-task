import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './schemas/user.schema';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()

export class AuthService {
    
    constructor(private readonly userRepository: UserRepository, private readonly jwtService:JwtService) {}
    
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        const { username, password } = authCredentialsDto;
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await this.userRepository.create(username, hashedPassword);
        try{
            await user.save();
            
            return user;
        } catch (error) {
            if (error.code === '23505') { //duplicate error code
                throw new ConflictException('username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>{
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else { 
            throw new UnauthorizedException('username or password invalid');
         }
    }
}