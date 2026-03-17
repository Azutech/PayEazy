import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('UserService', 'createUser')
  create(createUserDto: CreateUserDto) {
    return this.authService.addUser(createUserDto);
  }

  @GrpcMethod('UserService', 'findAllUsers')
  findAll() {
    return this.authService.findAll();
  }
}
