import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [OrdersModule, AccountsModule],
  controllers: [],
  providers: [],
})
export class GatewayHttpModule {}
