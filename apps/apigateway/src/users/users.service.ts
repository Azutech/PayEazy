import {
  Injectable,
  Inject,
  OnModuleInit,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateUserDto } from 'libs/dtos/user.dto';
import { UserServiceGrpc } from './interface/users.interface';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceGrpc;

  constructor(@Inject('USER_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceGrpc>('UserService');
  }

  register(data: CreateUserDto) {
    return firstValueFrom(
      this.userService.register(data).pipe(
        catchError((err) => {
          throw new HttpException(
            err.details || err.message,
            HttpStatus.CONFLICT,
          );
        }),
      ),
    );
  }

  login(data: { email: string; password: string }) {
    return firstValueFrom(
      this.userService.login(data).pipe(
        catchError((err) => {
          throw new HttpException(
            err.details || err.message,
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    ); // ✅ camelCase
  }

  verification(code: number) {
    return firstValueFrom(
      this.userService.verification(code).pipe(
        catchError((err) => {
          throw new HttpException(
            err.details || err.message,
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );
  }

  dashboard(userId: string) {
    return firstValueFrom(
      this.userService.dashboard(userId).pipe(
        catchError((err) => {
          throw new HttpException(
            err.details || err.message,
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );
  }

}
