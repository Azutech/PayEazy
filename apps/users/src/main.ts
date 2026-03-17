import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { UsersModule } from './app.module';
import { UserProtoPath } from 'libs/common/grpc-path';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(UsersModule);
  const configService = appContext.get(ConfigService);

  const port = configService.get<string>('USER_PORT') as string;
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: UserProtoPath('user'),
        url: `0.0.0.0:${port}`,
      },
    },
  );

  await appContext.close();
  await app.listen();

  logger.log(`User Microservice is listening on port ${port}`);
}
bootstrap();
