import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/src/prisma.service';
import { Tokens } from '@prisma/client';
import { TokenI } from '../interface/users.interface';

@Injectable()
export class TokensRepository {
  constructor(private prisma: PrismaService) {}

  async createToken(
    userId: string,
    email: string,
    code: number,
    expiresAt: Date,
  ): Promise<Tokens> {
    return this.prisma.tokens.create({
      data: { userId, email, code, expiresAt },
    });
  }

  async createTokenI(data: TokenI): Promise<Tokens> {
    return this.prisma.tokens.create({
      data: {
        userId: data.userId,
        email: data.email,
        token: data.token,
        expiresAt: data.expiresAt,
      },
    });
  }

  async findByEmail(email: string): Promise<Tokens | null> {
    return await this.prisma.tokens.findFirst({
      where: { email },
    });
  }

  async findTokenByCode(code: number): Promise<Tokens | null> {
    return await this.prisma.tokens.findFirst({
      where: { code },
    });
  }

  async deleteTokenCode(code: number): Promise<void> {
    await this.prisma.tokens.deleteMany({
      where: { code },
    });
  }
  async deleteTokenI(email: string): Promise<void> {
    await this.prisma.tokens.deleteMany({
      where: { email },
    });
  }
  async deleteExpiredTokens() {
    return await this.prisma.tokens.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }
}
