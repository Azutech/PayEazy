import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../../../../../libs/database/src/prisma.service';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: any): Promise<User> {
        return this.prisma.user.create({ data });
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