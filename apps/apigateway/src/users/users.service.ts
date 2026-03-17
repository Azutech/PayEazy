import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { CreateUserDto } from 'libs/dtos/user.dto';

interface UserServiceGrpc {
  register(data: CreateUserDto): Observable<any>; // ✅ camelCase of proto rpc Register
  login(data: { email: string; password: string }): Observable<any>; // ✅ camelCase of proto rpc Login
}

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceGrpc;

  constructor(@Inject('USER_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceGrpc>('UserService');
  }

  register(data: CreateUserDto) {
    return firstValueFrom(this.userService.register(data)); // ✅ camelCase
  }

  login(data: { email: string; password: string }) {
    return firstValueFrom(this.userService.login(data)); // ✅ camelCase
  }
}
