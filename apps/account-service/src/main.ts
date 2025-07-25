import { NestFactory } from '@nestjs/core';
import { AccountServiceModule } from './account-service.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AccountServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:' + '8011',
        package: 'service_account',
        protoPath: join(
          __dirname,
          process.env.NODE_ENV === 'dev'
            ? '../../../proto/service_account.proto'
            : 'proto/service_account.proto',
        ),
      },
    },
  );
  await app.listen();

  logger.debug('account-service start');
}
void bootstrap();
