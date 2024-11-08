import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { User, UserSchema} from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [ 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 36000,
      }
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
