// import { Injectable, OnModuleInit } from '@nestjs/common'
// import { PrismaClient } from '../../../generated/prisma/client'

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {

//     async onModuleInit() {
//         await this.$connect()
//     }

// }

import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');

    if (!connectionString) {
      throw new Error('DATABASE_URL is not set in environment variables');
    }

    // Create the PostgreSQL Pool first
    const pool = new Pool({ connectionString });

    // Create the adapter
    const adapter = new PrismaPg(pool);

    // Call super FIRST — this fixes the TS2376/TS17009 errors
    super({
      adapter,
      log: [
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });

    this.logger.log('PrismaService initialized with adapter');
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Prisma connected to PostgreSQL');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Prisma disconnected');
  }
}
