import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { BuyResp, OrderService } from '@app/proto/proto/service_order';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Controller('orders')
export class OrdersController {
  private orderService: OrderService;
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('ORDER_SERVICE') private orderGrpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderService =
      this.orderGrpcClient.getService<OrderService>('OrderService');
  }

  @Post('buy')
  async buy(@Body() body: { token: string; bookName: string }) {
    const buyResult = await firstValueFrom(
      this.orderService.Buy({
        token: body.token,
        bookName: body.bookName,
      }) as unknown as Observable<BuyResp>,
    );
    if (buyResult.errorCode?.code !== 0) {
      return {
        message: buyResult.errorCode?.message,
      };
    }
    return {
      message: buyResult.message,
    };
  }
}
