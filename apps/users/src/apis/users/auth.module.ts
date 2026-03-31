import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './repository/users.repository';
import { TokensRepository } from './repository/token.repository';
import { WalletRepository } from '../wallets/wallet.repository';
import { AccountRepository } from '../wallets/accounts.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, TokensRepository, AccountRepository, WalletRepository],
})
export class AuthModule {}
