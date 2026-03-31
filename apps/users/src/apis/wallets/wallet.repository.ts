import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/src/prisma.service';
import { Wallets } from '@prisma/client';

@Injectable()
export class WalletRepository {
  constructor(private prisma: PrismaService) {}

  async viewWallet(userId: string): Promise<Wallets | null> {
    return await this.prisma.wallets.findFirst({
      where: { userId },
    });
  }
}
