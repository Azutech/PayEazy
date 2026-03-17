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
      throw new ConflictException(
        'Both email and phone number are already registered',
        'DUPLICATE_EMAIL_AND_PHONE',
      );
    }

    if (userByEmail) {
      throw new ConflictException(
        'Email is already in use',
        'DUPLICATE_EMAIL',
        'email',
      );
    }

    if (userByPhone) {
      throw new ConflictException(
        'Phone number is already in use',
        'DUPLICATE_PHONE',
        'phoneNumber',
      );
    }

    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }
}
