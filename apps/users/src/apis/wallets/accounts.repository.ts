import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/src/prisma.service';
import { Account } from '@prisma/client';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async viewAccount(id: string): Promise<Account | null> {
    return await this.prisma.account.findFirst({
      where: { id },
    });
  }

  async viewWalletAccount(walletId: string): Promise<Account[]> {
    return await this.prisma.account.findMany({
      where: { walletId },
    });
  }
}
