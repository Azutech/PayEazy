import { Observable } from 'rxjs';
import { CreateUserDto } from 'libs/dtos/user.dto';

export interface UserServiceGrpc {
  register(data: CreateUserDto): Observable<any>; // ✅ camelCase of proto rpc Register
  login(data: { email: string; password: string }): Observable<any>; // ✅ camelCase of proto rpc Login
  verification(code: number): Observable<any>; // ✅ camelCase of proto rpc Verification
}
