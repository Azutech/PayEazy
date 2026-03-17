import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

interface UserServiceGrpc {
  CreateUser(data: any): Observable<any>;
  FindAllUsers(data: {}): Observable<any>;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceGrpc;

  constructor(@Inject('USER_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceGrpc>('UserService');
  }

  createUser(data: any) {
    return this.userService.CreateUser(data);
  }

  findAllUsers() {
    return this.userService.FindAllUsers({});
  }
}
