import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './schemas/user.schema';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()

export class AuthService {
    
    constructor(private readonly userRepository: UserRepository) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        const { username, password } = authCredentialsDto;
        
        const user = await this.userRepository.create(username, password);
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
}