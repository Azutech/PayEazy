import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './repository/users.repository';
import { TokensRepository } from './repository/token.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, TokensRepository],
})
export class AuthModule {}
