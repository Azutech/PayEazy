import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { UsersModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('Users-Service');
  const app = await NestFactory.create(UsersModule);
  const configService = app.get(ConfigService);

  const port = configService.get<string>('USER_PORT') as string;

  console.log(port);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, 'user.proto'),
    },
  });

  await app.listen(port, () => logger.log(`App running on Port: ${port}`));
}
bootstrap();
