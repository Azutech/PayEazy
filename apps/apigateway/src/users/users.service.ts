import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

interface UserServiceGrpc {
  register(data: { email: string; password: string; phoneNumber: string }): Observable<any>;  // ✅ camelCase of proto rpc Register
  login(data: { email: string; password: string }): Observable<any>;                          // ✅ camelCase of proto rpc Login
}

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceGrpc;

  constructor(@Inject('USER_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceGrpc>('UserService');
  }

  register(data: { email: string; password: string; phoneNumber: string }) {

    console.log(data, "logs")
    return this.userService.register(data);   // ✅ camelCase
  }

  login(data: { email: string; password: string }) {
    return this.userService.login(data);      // ✅ camelCase
  }
}