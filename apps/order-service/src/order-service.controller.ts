import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { BuyReq, BuyResp } from '@app/proto/proto/service_order';
import {
  AccountService,
  VerifyTokenResp,
} from '@app/proto/proto/service_account';
import { firstValueFrom, Observable } from 'rxjs';

@Controller()
export class OrderServiceController implements OnModuleInit {
  private accountService: AccountService;
  constructor(
    private readonly orderServiceService: OrderServiceService,
    @Inject('ACCOUNT_SERVICE') private accountGrpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.accountService =
      this.accountGrpcClient.getService<AccountService>('AccountService');
  }

  @GrpcMethod('OrderService', 'Buy')
  async buy(payload: BuyReq): Promise<Partial<BuyResp>> {
    // 校验token
    const verifiedResult = await firstValueFrom(
      this.accountService.VerifyToken({
        token: payload.token,
      }) as unknown as Observable<VerifyTokenResp>,
    );
    if (verifiedResult.errorCode?.code !== 0) {
      return {
        errorCode: verifiedResult.errorCode,
      };
    }
    return await this.orderServiceService.buy(payload);
  }
}
