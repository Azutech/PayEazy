import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  findAll() {
    return this.authService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.authService.findOne(id);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.authService.remove(id);
  }
}
