export class CreateUserDto {
  email: string;
  password: string;
  phoneNumber: string;
  avatar?: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}
