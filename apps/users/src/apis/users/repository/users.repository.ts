import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../../../../../libs/database/src/prisma.service';
import { IUsersRepository } from '../interface/users.interface';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: IUsersRepository): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
    
      },
    });

    return user;
  }

  async viewProfile(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findByPhoneNumber(phoneNumber: string) {
    return await this.prisma.user.findUnique({ where: { phoneNumber } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
