import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async addUser(createUserDto: CreateUserDto) {
    const [findUserByEmail, findUserByPhoneNumber] = await Promise.all([
      this.usersRepository.findByEmail(createUserDto.email),
      this.usersRepository.findByPhoneNumber(createUserDto.phoneNumber),
    ]);

    if (findUserByEmail || findUserByPhoneNumber) {
      throw new Error('User already exists');
    }

    const user = await this.usersRepository.create(createUserDto);
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }
}
