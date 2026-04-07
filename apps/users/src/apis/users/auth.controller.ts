import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'libs/dtos/user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('UserService', 'Register') // ✅ matches proto: rpc Register
  async register(createUserDto: CreateUserDto) {
    const result = await this.authService.addUser(createUserDto);
    return {
      message: 'User registered successfully',
      user: result.user,
      token: result.token,
    };
  }

  @GrpcMethod('UserService', 'ResendVerification')
  async resendVerification(data: { email: string }) {
    return this.authService.resendVerification(data.email);
  }

  @GrpcMethod('UserService', 'Verification')
  async verification(data: { code: number }) {
    return this.authService.verification(data.code);
  }

  @GrpcMethod('UserService', 'Login') // ✅ matches proto: rpc Register
  async login(loginUserDto: LoginUserDto) {
    await this.authService.loginUser(loginUserDto);
    return { message: 'User login successfully' };
  }

  @GrpcMethod('UserService', 'Dashboard') // ✅ matches proto: rpc Register
  async dashboard(userId: string) {
    const dashboardData = await this.authService.userDashboard(userId);
    return {
      message: 'User dashboard data retrieved successfully',
      data: dashboardData,
    };
  }
}
