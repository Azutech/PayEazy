import { Injectable, HttpStatus } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from 'libs/dtos/user.dto';
import { UsersRepository } from './repository/users.repository';
import {
  generateSecureCode,
  getExpiresAt,
  validatePassword,
} from './utils/user.utils';
import { PrismaService } from 'libs/database/src/prisma.service';
import { TokensRepository } from './repository/token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokensRepository: TokensRepository,
    private readonly prisma: PrismaService,
  ) {}

  async addUser(createUserDto: CreateUserDto) {
    const { email, phoneNumber, password } = createUserDto;
    const [userByEmail, userByPhone] = await Promise.all([
      this.usersRepository.findByEmail(email),
      this.usersRepository.findByPhoneNumber(phoneNumber),
    ]);

    if (userByEmail && userByPhone) {
      throw new RpcException({
        message: 'Both email and phone number are already registered',
        status: HttpStatus.CONFLICT,
      });
    }

    if (userByEmail) {
      throw new RpcException({
        message: 'Email is already in use',
        status: HttpStatus.CONFLICT,
      });
    }

    if (userByPhone) {
      throw new RpcException({
        message: 'Phone number is already in use',
        status: HttpStatus.CONFLICT,
      });
    }

    if (!validatePassword(password)) {
      throw new RpcException({
        message:
          'Password must be atleast 12 characters long and contain a number, a special character and an uppercase letter',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const hashed = await hash(password, 8);
    const code = generateSecureCode();
    const expiresAt = getExpiresAt();

    // const newUser = {
    //   email,
    //   password: hashed,
    //   phoneNumber,
    //   avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
    // };

    // return this.usersRepository.create(newUser);

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            password: hashed,
            phoneNumber,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
          },
        });

        const token = await tx.tokens.create({
          data: {
            userId: user.id,
            email: user.email,
            code: code,
            expiresAt: expiresAt,
          },
        });

        return { user, token };
      });

      return {
        user: {
          id: result.user.id,
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
        },
        token: {
          id: result.token.id,
          token: result.token.code,
        },
      };
    } catch (error) {
      if (error.code === 'P2002') {
        // Unique constraint violation (race condition)
        const target = error.meta?.target;
        if (target?.includes('phoneNumber')) {
          throw new RpcException(
            'Phone number already exists. Please try again.',
          );
        }
        if (target?.includes('email')) {
          throw new RpcException('Email already exists');
        }
        throw new RpcException('phoneNumber or email already exists');
      }

      throw error;
    }
  }

  // async verifyUser(email: string) {
  //   const user = await this.usersRepository.findByEmail(email);
  //   if (!user) {
  //     throw new RpcException({
  //       message: 'User not found',
  //       status: HttpStatus.NOT_FOUND,
  //     });
  //   }
  //   return user;
  // }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new RpcException({
        message: 'User not found',
        status: HttpStatus.NOT_FOUND,
      });
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new RpcException({
        message: 'Invalid password',
        status: HttpStatus.UNAUTHORIZED,
      });
    }
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }
}
