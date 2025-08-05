import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { join } from 'node:path';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:' + '8012',
        package: 'service_order',
        protoPath: join(
          __dirname,
          process.env.NODE_ENV === 'dev'
            ? '../../../proto/service_order.proto'
            : 'proto/service_order.proto',
        ),
      },
    },
  );
  await app.listen();

  logger.debug('account-service start');
  await app.listen();
}
void bootstrap();
