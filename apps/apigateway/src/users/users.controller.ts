import {   Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() data: any) {
    return this.usersService.createUser(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
