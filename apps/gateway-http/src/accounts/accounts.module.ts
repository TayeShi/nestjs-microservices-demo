import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import {
  ClientProxyFactory,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'node:path';

@Module({
  controllers: [AccountsController],
  providers: [
    AccountsService,
    {
      // 动态rankService
      provide: 'ACCOUNT_SERVICE',
      useFactory: () => {
        const serviceOpts: GrpcOptions = {
          transport: Transport.GRPC,
          options: {
            package: 'service_account',
            url: 'localhost:8011',
            protoPath: join(
              __dirname,
              process.env.NODE_ENV === 'dev'
                ? '../../../proto/service_account.proto'
                : 'proto/service_account.proto',
            ),
          },
        };
        return ClientProxyFactory.create(serviceOpts);
      },
      inject: [],
    },
  ],
})
export class AccountsModule {}
