import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:3001',
        protoPath: join(__dirname, '../auth.proto'),
        package: AUTH_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
