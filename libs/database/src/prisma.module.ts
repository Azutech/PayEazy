import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule], // add this
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
