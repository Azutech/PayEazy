import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('API-GATEWAY');

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('APIGATEWAY_PORT') as number;

  // Global API prefix
  app.setGlobalPrefix('api');

  // Enable CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Global validation
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );

  await app.listen(port);

  logger.log(`API Gateway running on http://localhost:${port}`);
}

bootstrap();
