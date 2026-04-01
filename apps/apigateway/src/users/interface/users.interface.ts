import { Observable } from 'rxjs';
import { CreateUserDto } from 'libs/dtos/user.dto';

export interface UserServiceGrpc {
  register(data: CreateUserDto): Observable<any>; 
  login(data: { email: string; password: string }): Observable<any>; 
  verification(code: number): Observable<any>; 
  dashboard(userId: string): Observable<any>; 
}
