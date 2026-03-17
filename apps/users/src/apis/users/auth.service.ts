import { Injectable, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from '../../../../../libs/dtos/user.dto';
import { UsersRepository } from './repository/users.repository';

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
    const { email, phoneNumber } = createUserDto;
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

    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }
}
