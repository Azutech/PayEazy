import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../../../../libs/dtos/user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('UserService', 'Register') // ✅ matches proto: rpc Register
  async register(createUserDto: CreateUserDto) {
    await this.authService.addUser(createUserDto);
    return { message: 'User registered successfully', user: createUserDto };
  }
}
