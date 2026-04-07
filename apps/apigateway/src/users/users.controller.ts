import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from 'libs/dtos/user.dto';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: CreateUserDto) {
    const user = await this.usersService.register(body);
    return user;
  }

  @Post('login')
  async login(@Body() body: LoginUserDto, @Res() res: Response) {
    const user = await this.usersService.login(body);
    return user;
  }

  @Post('verification')
  @HttpCode(HttpStatus.OK)
  async verification(@Body('code') code: number, @Res() res: Response) {
    const user = await this.usersService.verification(code);
    return user;
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  async resendVerification(@Body('email') email: string, @Res() res: Response) {
    const user = await this.usersService.resendVerification(email);
    return user;
  }

  @Get('dashboard')
  async dashboard(@Query('userId') userId: string, @Res() res: Response) {
    const user = await this.usersService.dashboard(userId);
    return user;
  }
}
