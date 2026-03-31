import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'libs/dtos/user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('UserService', 'Register') // ✅ matches proto: rpc Register
  async register(createUserDto: CreateUserDto) {
    await this.authService.addUser(createUserDto);
    return { message: 'User registered successfully', user: createUserDto };
  }

  @GrpcMethod('UserService', 'Verification') // ✅ matches proto: rpc Register
  async verification(code: number) {
    await this.authService.verification(code);
    return { message: 'User verified successfully' };
  }

  @GrpcMethod('UserService', 'Login') // ✅ matches proto: rpc Register
  async login(loginUserDto: LoginUserDto) {
    await this.authService.loginUser(loginUserDto);
    return { message: 'User login successfully' };
  }
}
