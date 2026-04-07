import { Observable } from 'rxjs';
import { CreateUserDto } from 'libs/dtos/user.dto';

export interface UserServiceGrpc {
  register(data: CreateUserDto): Observable<any>;
  login(data: { email: string; password: string }): Observable<any>;
  verification(data: { code: number }): Observable<any>;
  resendVerification(data: { email: string }): Observable<any>;
  dashboard(userId: string): Observable<any>;
}
