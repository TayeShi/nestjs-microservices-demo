import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {
  ClientProxyFactory,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'node:path';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      // 动态rankService
      provide: 'ORDER_SERVICE',
      useFactory: () => {
        const serviceOpts: GrpcOptions = {
          transport: Transport.GRPC,
          options: {
            package: 'service_order',
            url: 'localhost:8012',
            protoPath: join(
              __dirname,
              process.env.NODE_ENV === 'dev'
                ? '../../../proto/service_order.proto'
                : 'proto/service_order.proto',
            ),
          },
        };
        return ClientProxyFactory.create(serviceOpts);
      },
      inject: [],
    },
  ],
})
export class OrdersModule {}
