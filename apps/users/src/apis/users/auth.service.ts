import { Injectable, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from '../../../../../libs/dtos/user.dto';
import { UsersRepository } from './repository/users.repository';
import { validatePassword } from './utils/user.utils';

export class ConflictException extends RpcException {
  constructor(message: string, code: string, field?: string) {
    super({
      message,
      status: HttpStatus.CONFLICT,
      code,
      field,
    });
  }
}

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async addUser(createUserDto: CreateUserDto) {
    const { email, phoneNumber, password } = createUserDto;
    const [userByEmail, userByPhone] = await Promise.all([
      this.usersRepository.findByEmail(email),
      this.usersRepository.findByPhoneNumber(phoneNumber),
    ]);

    if (userByEmail && userByPhone) {
      throw new RpcException({
        message: 'Both email and phone number are already registered',
        status: HttpStatus.CONFLICT,
      });
    }

    if (userByEmail) {
      throw new RpcException({
        message: 'Email is already in use',
        status: HttpStatus.CONFLICT,
      });
    }

    if (userByPhone) {
      throw new RpcException({
        message: 'Phone number is already in use',
        status: HttpStatus.CONFLICT,
      });
    }


    if (!validatePassword(password)) {
      throw new RpcException({
        message: 'Password must be atleast 12 characters long and contain a number, a special character and an uppercase letter',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }
}
